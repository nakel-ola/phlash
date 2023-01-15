import clsx from "clsx";
import { motion } from "framer-motion";
import { CloseCircle, Moon, Sun1, Trash } from "iconsax-react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { add } from "../../redux/features/dialogSlice";
import { deleteAllGroup } from "../../redux/features/requestsSlice";
import { useTheme } from "../../utils/theme";

interface Props {
  onClose?(): void;
}

const MenuCard = (props: Props) => {
  const { onClose } = props;

  const dispatch = useDispatch();
  let ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => onClose?.());

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleClick = () => {
    const isDark = currentTheme === "dark";

    setTheme(isDark ? "light" : "dark");

    onClose?.();
  };

  const items = [
    {
      title: currentTheme !== "dark" ? "Dark Mode" : "Light Mode",
      Icon: currentTheme !== "dark" ? Moon : Sun1,
      onClick: handleClick,
    },
    {
      title: "Delete all request",
      Icon: Trash,
      onClick: () => {
        onClose?.();
        dispatch(
          add({
            type: "delete",
            data: {
              type: "all",
            },
          })
        );
      },
    },
  ];

  return (
    <motion.div className="absolute bottom-0 h-full w-full bg-black/40 flex justify-center">
      <motion.div
        ref={ref}
        initial={{ translateY: "113px" }}
        animate={{ translateY: "0px" }}
        exit={{ translateY: "113px" }}
        transition={{
          type: "spring",
          duration: 0.2,
        }}
        className={clsx(
          "h-fit mb-5 pb-1 rounded-lg w-[90%] bg-white dark:bg-dark mt-auto overflow-hidden"
        )}
      >
        <div className="flex items-center justify-between px-2 py-2 border-b-[1px] border-b-slate-100 dark:border-neutral-800 mb-2">
          <div />
          <p className="text-base font-bold text-black dark:text-white">Menu</p>

          <button className="" onClick={() => onClose?.()}>
            <CloseCircle
              variant="Bold"
              className="text-black dark:text-white"
            />
          </button>
        </div>

        {items.map(({ title, Icon, onClick }, index: number) => (
          <div
            key={index}
            className="flex items-center mx-2 my-1 hover:bg-slate-100 hover:dark:bg-neutral-800 h-[40px] rounded-lg cursor-pointer"
            onClick={onClick}
          >
            <div className="h-[35px] w-[35px] flex items-center justify-center">
              <Icon className="text-black dark:text-white" />
            </div>
            <p className="text-black dark:text-white">{title}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MenuCard;
