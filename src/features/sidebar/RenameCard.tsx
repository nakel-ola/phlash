import axios from "axios";
import clsx from "clsx";
import { motion } from "framer-motion";
import { CloseCircle } from "iconsax-react";
import React, { FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputCard from "../../components/InputCard";
import Loader from "../../components/Loader";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { remove, selectDialog } from "../../redux/features/dialogSlice";
import { updateGroup, updateRequest } from "../../redux/features/requestsSlice";
import { selectUserId } from "../../redux/features/userSlice";
import { BASE_URL } from "./AddCard";

const RenameCard = () => {
  let dispatch = useDispatch();
  const dialogState = useSelector(selectDialog);
  const userId = useSelector(selectUserId);

  let ref = useRef<HTMLFormElement>(null);

  const [input, setInput] = useState(dialogState.rename.data?.name ?? "");
  const [loading, setLoading] = useState(false);

  const close = () => dispatch(remove({ type: "rename" }));

  useOutsideClick(ref, close);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    let groupId = dialogState.rename.data.groupId;
    if (dialogState.rename.data?.request) {
      let request = dialogState.rename.data.request;

      const data = {
        id: request.id,
        method: request.method,
        title: input,
        url: request.url,
        userId,
      };
      await axios.patch(`${BASE_URL}/api/update-request`, data).then(() => {
        dispatch(updateRequest({ groupId, request: data }));
      });
    } else {
      await axios
        .patch(`${BASE_URL}/api/update-folder`, {
          id: groupId,
          groupName: input,
          userId,
        })
        .then(() => dispatch(updateGroup({ groupId, name: input })));
    }
    close();
  };
  return (
    <motion.div className="absolute z-10 bottom-0 h-full w-full bg-black/40 flex justify-center ">
      <motion.form
        ref={ref}
        onSubmit={handleSubmit}
        initial={{ y: "40vh" }}
        animate={{ y: "0vh" }}
        exit={{ y: "40vh" }}
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
            Rename Request Group
          </p>

          <button type="button" className="" onClick={close}>
            <CloseCircle
              variant="Bold"
              className="text-black dark:text-white"
            />
          </button>
        </div>

        {!loading ? (
          <>
            <div className="mx-2 my-1 w-[85%] ml-5">
              <InputCard
                title="Name your request"
                toggle
                value={input}
                placeholder="Untitled Request"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between p-2">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 dark:border-neutral-800 bg-white dark:bg-dark px-4 py-2 text-sm font-medium text-gray-700 dark:text-neutral-400 shadow-sm hover:bg-gray-50 hover:dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={close}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!input}
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-offset-dark focus:ring-offset-2 "
                onClick={handleSubmit}
              >
                Rename
              </button>
            </div>
          </>
        ) : (
          <Loader title="Renaming..." />
        )}
      </motion.form>
    </motion.div>
  );
};

export default RenameCard;
