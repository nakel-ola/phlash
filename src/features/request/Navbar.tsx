import { MethodEnum } from "@prisma/client";
import axios from "axios";
import clsx from "clsx";
import { ArrowDown2 } from "iconsax-react";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "../../components/menu/menu";
import { Transition } from "../../components/transitions/transition";
import {
  FormBody,
  GqlBody,
  selectRequestData,
} from "../../redux/features/requestDataSlice";
import {
  selectSelected,
  updateRequest,
} from "../../redux/features/requestsSlice";
import { add, toggleLoading } from "../../redux/features/responseSlices";
import { selectUserId } from "../../redux/features/userSlice";
import { statusColor, statusbg } from "../../utils/statusColor";
import { BASE_URL } from "../sidebar/AddCard";

const items: MethodEnum[] = ["Get", "Post", "Patch", "Put", "Delete"];

const handleForm = (data: FormBody[]): FormData => {
  let formdata = new FormData();

  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    if (element.checkedValue) {
      let item = element.value!;
      formdata.append(item?.field, item?.value! ?? item.file!);
    }
  }

  return formdata;
};

const handleBodyContent = (
  bodyContent: string | FormBody[] | GqlBody
): string | FormData | GqlBody | null => {
  if (typeof bodyContent === "string") {
    return bodyContent;
  } else if (Array.isArray(bodyContent)) {
    return handleForm(bodyContent);
  } else if (bodyContent?.query || bodyContent?.variables) {
    return JSON.stringify(bodyContent);
  } else {
    return null;
  }
};

interface Props {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = (props: Props) => {
  const { setToggle } = props;
  const requestState = useSelector(selectSelected);
  const userId = useSelector(selectUserId);
  const requestDataState = useSelector(selectRequestData);
  const dispatch = useDispatch();
  const [input, setInput] = useState(requestState?.url ?? "");
  const [progress, setProgress] = useState<number>();

  const storeResponse = (data: any, type: "success" | "error") => {
    let end = Date.now();
    let milliseconds = Math.floor((end - progress!) % 1000);

    dispatch(
      add({
        data: data?.data ?? data?.message,
        headers: data?.headers ? { ...data?.headers } : {},
        progress: milliseconds,
        status: data!?.status,
        statusText: data!?.statusText,
        type,
      })
    );
    dispatch(toggleLoading({ loading: false }));

    setProgress(0);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setToggle(true);

    let start = Date.now();
    setProgress(start);

    dispatch(toggleLoading({ loading: true }));
    await axios
      .patch(`${BASE_URL}/api/update-request`, {
        url: input,
        id: requestState?.id,
        userId,
      })
      .then(() => {
        dispatch(
          updateRequest({
            groupId: requestState?.groupId!,
            request: { ...requestState!, url: input },
          })
        );
      });

    let bodyContent = requestDataState.bodyContent;
    let data = handleBodyContent(bodyContent!);

    const header = new Headers(requestDataState.headersList);

    await axios({
      url: input,
      method: requestState?.method.toLowerCase(),
      headers: header as any,
      data,
    })
      .then((data) => storeResponse(data, "success"))
      .catch((err) => {
        let data = err?.response ?? err;
        storeResponse(data, "error");
      });
  };

  useEffect(() => {
    if (requestState) {
      setInput(requestState?.url);
    }
  }, [requestState]);

  const handleMethod = async (method: MethodEnum) => {
    dispatch(
      updateRequest({
        groupId: requestState?.groupId!,
        request: {
          ...requestState!,
          method,
        },
      })
    );
    await axios.patch(`${BASE_URL}/api/update-request`, {
      id: requestState?.id,
      userId,
      method,
    });
  };

  return (
    <div className="flex items-center justify-between p-2 border-b-[1px] border-b-slate-100 dark:border-b-neutral-800">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className={clsx(
            "inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-neutral-800 bg-white dark:bg-dark px-4 py-2 text-sm font-extrabold shadow-sm hover:bg-gray-50 hover:dark:bg-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-100 focus:dark:ring-offset-dark",
            statusColor(requestState?.method!)
          )}
        >
          {requestState?.method!}{" "}
          <ArrowDown2
            size={20}
            variant="Bold"
            className="text-black dark:text-white ml-2"
          />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
            <div className="">
              {items.map((item: MethodEnum, index) => (
                <Menu.Item key={index}>
                  <a
                    href="#"
                    className={clsx(
                      requestState?.method === item
                        ? `${statusColor(item)} ${statusbg(item)}`
                        : "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400",

                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => handleMethod(item)}
                  >
                    {item}
                  </a>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <form onSubmit={handleSubmit} className="flex items-center flex-1">
        <div className="flex-1 mx-2">
          <input
            type="text"
            className="w-full bg-transparent border-0 outline-0 text-black dark:text-white"
            placeholder="url"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 dark:focus:ring-offset-dark focus:ring-primary focus:ring-offset-2 "
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Navbar;
