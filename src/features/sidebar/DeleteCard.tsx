import axios from "axios";
import clsx from "clsx";
import { motion } from "framer-motion";
import { CloseCircle } from "iconsax-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { remove, selectDialog } from "../../redux/features/dialogSlice";
import {
  deleteAllGroup,
  deleteGroup,
  deleteRequest,
} from "../../redux/features/requestsSlice";

const DeleteCard = () => {
  let dispatch = useDispatch();
  const dialogState = useSelector(selectDialog);
  const [loading, setLoading] = useState(false);

  let ref = useRef<HTMLDivElement>(null);

  const close = () => dispatch(remove({ type: "delete" }));

  useOutsideClick(ref, close);

  const handleDelete = async () => {
    setLoading(true);
    let id = dialogState.delete.data?.id,
      groupId = dialogState.delete.data.groupId;

    if (dialogState.delete.data.type === "all") {
      await axios
        .delete("/api/delete-folders")
        .then(() => dispatch(deleteAllGroup()));
    } else if (id) {
      await axios
        .delete("/api/delete-request", { data: { id } })
        .then(() => dispatch(deleteRequest({ groupId, id })));
    } else {
      await axios
        .delete("/api/delete-folder", { data: { id: groupId } })
        .then(() => dispatch(deleteGroup({ groupId })));
    }

    close();
  };

  return (
    <motion.div className="absolute z-10 bottom-0 h-full w-full bg-black/40 flex justify-center ">
      <motion.div
        ref={ref}
        initial={{ y: "160px" }}
        animate={{ y: "0px" }}
        exit={{ y: "160px" }}
        transition={{
          type: "spring",
          duration: 0.2,
        }}
        className={clsx(
          "h-fit z-10 mb-5 pb-1 rounded-lg w-[90%] bg-white dark:bg-dark mt-auto overflow-hidden"
        )}
      >
        <div className="flex items-center justify-between px-2 py-2 border-b-[1px] border-b-slate-100 dark:border-neutral-800 mb-2">
          <div />
          <p className="text-base font-bold text-black dark:text-white">
            Delete Request Group
          </p>

          <button className="" onClick={close}>
            <CloseCircle
              variant="Bold"
              className="text-black dark:text-white"
            />
          </button>
        </div>

        {!loading ? (
          <>
            <div className="mx-2 my-1 w-[85%] ml-5">
              <p className="text-center text-neutral-600 dark:text-neutral-400">
                Do you really want to delete{" "}
                {dialogState.delete.data?.type === "all"
                  ? "all requests"
                  : dialogState.delete.data?.name}{" "}
                ?
              </p>
            </div>

            <div className="flex items-center justify-between p-2">
              <button
                className="inline-flex items-center rounded-md border border-gray-300 dark:border-neutral-800 bg-white dark:bg-dark px-4 py-2 text-sm font-medium text-gray-700 dark:text-neutral-400 shadow-sm hover:bg-gray-50 hover:dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={close}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-offset-dark focus:ring-offset-2 "
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </motion.div>
    </motion.div>
  );
};

export default DeleteCard;
