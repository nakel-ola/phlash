import { Add, More } from "iconsax-react";
import { useDispatch } from "react-redux";
import { add } from "../../redux/features/dialogSlice";

interface Props {
  onMoreClick?(): void;
}

const Navbar = (props: Props) => {
  const { onMoreClick } = props;

  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between m-2 h-[35px]">
      <button
        className="w-[35px] h-[35px] flex items-center justify-center hover:scale-105 active:scale-95 hover:bg-slate-100 hover:dark:bg-neutral-800 rounded-full"
        onClick={() => onMoreClick?.()}
      >
        <More size={25} className="text-black dark:text-white" />
      </button>
      <p className="text-lg font-bold text-black dark:text-white">Requests</p>
      <button
        className="w-[35px] h-[35px] flex items-center justify-center hover:scale-105 active:scale-95 hover:bg-slate-100 hover:dark:bg-neutral-800 rounded-full"
        onClick={() =>
          dispatch(
            add({
              type: "create",
            })
          )
        }
      >
        <Add size={25} className="text-black dark:text-white" />
      </button>
    </div>
  );
};

export default Navbar;
