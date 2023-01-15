import { TickSquare } from "iconsax-react";
import { useEffect, useState } from "react";
import usePrevious from "../hooks/use-previous";


const Checkbox = ({
  checked = false,
  onClick,
}: {
  checked?: boolean;
  onClick?(value: boolean): void;
}) => {
  const [open, setOpen] = useState(checked ?? false);

  const prevChecked = usePrevious(checked);

  useEffect(() => {
    if (checked !== prevChecked) {
      setOpen(checked);
    }
  }, [checked, prevChecked]);

  return (
    <div
      className={`w-[20px] h-[20px] border-[1.5px] flex items-center justify-center rounded-md shrink-0 cursor-pointer ${
        open ? "border-primary" : "border-neutral-400 dark:border-neutral-700 "
      }`}
      onClick={() => {
        onClick?.(!open);
        setOpen(!open);
      }}
    >
      {open && <TickSquare size={20} variant="Bold" className="text-primary" />}
    </div>
  );
};

export default Checkbox;
