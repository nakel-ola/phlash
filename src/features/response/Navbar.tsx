import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectResponse } from "../../redux/features/responseSlices";
import { formatBytes } from "../../utils/formatBytes";

interface Props {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = (props: Props) => {
  const { setToggle } = props;
  const responseState = useSelector(selectResponse);

  let type = responseState?.type;

  const status = `${responseState?.status} ${responseState?.statusText}`;

  return (
    <div className="flex items-center justify-between p-2 border-b-[1px] border-b-slate-100 dark:border-b-neutral-800">
      <div className="flex">
        <button
          className={clsx(
            "inline-flex items-center justify-center rounded-md border  bg-white dark:bg-dark px-4 py-2 text-sm font-extrabold shadow-sm hover:bg-gray-50 hover:dark:bg-dark  mx-2 ",
            type === "success"
              ? "text-green-600 border-green-600/40"
              : type === "error"
              ? "text-red-500 border-red-600/40"
              : "text-black dark:text-white border-gray-300 dark:border-neutral-800"
          )}
        >
          {responseState?.status !== undefined ? status : "Error"}
        </button>
        <button
          className={clsx(
            "inline-flex items-center justify-center rounded-md border  bg-white dark:bg-dark px-4 py-2 text-sm font-extrabold shadow-sm hover:bg-gray-50 hover:dark:bg-dark mx-2 ",
            type === "success"
              ? "text-green-600 border-green-600/40"
              : type === "error"
              ? "text-red-500 border-red-600/40"
              : "text-black dark:text-white border-gray-300 dark:border-neutral-800"
          )}
        >
          {!Number.isNaN(responseState?.progress) ? responseState?.progress : 0}{" "}
          ms
        </button>
        <button
          className={clsx(
            "inline-flex items-center justify-center rounded-md border  bg-white dark:bg-dark px-4 py-2 text-sm font-extrabold shadow-sm hover:bg-gray-50 hover:dark:bg-dark  mx-2 ",
            type === "success"
              ? "text-green-600 border-green-600/40"
              : type === "error"
              ? "text-red-500 border-red-600/40"
              : "text-black dark:text-white border-gray-300 dark:border-neutral-800"
          )}
        >
          {responseState?.headers["content-length"]
            ? formatBytes(Number(responseState?.headers["content-length"]))
            : "0 B"}
        </button>
      </div>

      <button
        onClick={() => setToggle(false)}
        className="w-[35px] h-[35px] lg:hidden flex items-center justify-center hover:scale-105 active:scale-95 hover:bg-slate-100 hover:dark:bg-neutral-800 rounded-full"
      >
        <IoClose size={25} className="text-black dark:text-white" />
      </button>
    </div>
  );
};

export default Navbar;
