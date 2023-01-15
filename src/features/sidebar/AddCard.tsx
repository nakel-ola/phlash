import { MethodEnum } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { motion } from "framer-motion";
import { CloseCircle } from "iconsax-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../../components/Divider";
import InputCard from "../../components/InputCard";
import Loader from "../../components/Loader";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { remove, selectDialog } from "../../redux/features/dialogSlice";
import { createGroup, createRequest } from "../../redux/features/requestsSlice";
import generateCode from "../../utils/generateCode";
import isUrl from "../../utils/is-url";
import { statusColor, statusbg } from "../../utils/statusColor";

interface Props {}

export let BASE_URL = process.env.BASE_URL;

interface Form {
  method: MethodEnum;
  groupName: string;
  title: string;
  url: string;
}

const AddCard = (props: Props) => {
  let dispatch = useDispatch();
  const dialogState = useSelector(selectDialog);

  let ref = useRef<HTMLFormElement>(null);

  const items: MethodEnum[] = ["Get", "Post", "Patch", "Put", "Delete"];

  const [form, setForm] = useState<Form>({
    method: "Get",
    groupName: "",
    title: "",
    url: "",
  });

  const { groupName, method, title, url } = form;

  const [loading, setLoading] = useState(false);

  const close = () => dispatch(remove({ type: "create" }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!method && !title && isUrl(url)) {
      return;
    }

    setLoading(true);

    if (dialogState.create.data?.type === "request") {
      let groupId = dialogState.create.data.groupId;
      await axios
        .post(`${BASE_URL}/api/create-request`, {
          title,
          method,
          url,
          folderId: groupId,
        })
        .then(({ data }) => {
          dispatch(
            createRequest({
              id: groupId,
              request: data,
            })
          );
        });
    } else {
      await axios
        .post(`${BASE_URL}/api/create-folder`, {
          groupName,
          title,
          method,
          url,
        })
        .then(({ data }) => {
          dispatch(createGroup(data));
        });
    }

    close();
  };
  useOutsideClick(ref, close);

  return (
    <motion.div className="absolute z-10 bottom-0 h-full w-full bg-black/40 flex justify-center ">
      <motion.form
        onSubmit={handleSubmit}
        ref={ref}
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
            New Request
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
            <div className="mx-2 my-1 ml-5">
              <p className="text-sm ">Choose method type for your request</p>

              <div className="flex items-center my-2">
                {items.map((item: MethodEnum, index: number) => (
                  <button
                    type="button"
                    key={index}
                    className={clsx(
                      "px-2 py-1 rounded-md mr-2 uppercase text-sm flex items-center font-bold font-mono",
                      method === item
                        ? statusColor(item)
                        : "text-neutral-600 dark:text-neutral-400",
                      method === item
                        ? statusbg(item)
                        : "bg-slate-100 dark:bg-neutral-800"
                    )}
                    onClick={() => setForm({ ...form, method: item })}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <Divider />

            <div className="mx-2 my-1 w-[85%] ml-5">
              {dialogState.create.data?.type !== "request" && (
                <InputCard
                  id="groupName"
                  title="Name Group Request"
                  toggle
                  value={groupName}
                  placeholder="Untitled Group Request"
                  onChange={handleChange}
                />
              )}

              <InputCard
                id="title"
                title="Name your request"
                toggle
                value={title}
                placeholder="Untitled Request"
                onChange={handleChange}
              />

              <InputCard
                title="Request Url"
                toggle
                value={url}
                placeholder="http://example.com"
                onChange={handleChange}
              />
            </div>
            <Divider />

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
                disabled={!method && !title && isUrl(url)}
                className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-offset-dark focus:ring-offset-2 "
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </>
        ) : (
          <Loader title="Creating..." />
        )}
      </motion.form>
    </motion.div>
  );
};

export default AddCard;
