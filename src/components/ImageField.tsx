import clsx from "clsx";
import { ChangeEvent, Fragment, useState } from "react";

interface CardProps {
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: File | null;
  className?: string;
  inputClassName?: string;
}

const ImageField = ({
  value,
  onChange,
  className,
  inputClassName,
  name
}: CardProps) => {
  const [focus, setFocus] = useState<boolean>(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    // if (e.target.files && e.target.files.length > 0) {
    //   const fileList = e.target.files;
    // }
  };
  return (
    <Fragment>
      <div
        className={clsx(
          "w-full rounded-lg flex items-center justify-between h-[35px] p-[5px] pr-0 mt-[8px] mr-[8px] transition-all duration-300 ease hover:shadow-sm bg-slate-100 dark:bg-neutral-800 ring-2 ring-offset-2",
          focus
            ? "ring-primary/30 ring-offset-primary/80"
            : "ring-transparent ring-offset-transparent",
          className
        )}
      >
        <input
          className={clsx(
            "text-[1rem] bg-transparent dark:text-white/90 border-none outline-none w-[95%] text-black dark:text-white mr-auto autofill:bg-transparent ",
            inputClassName
          )}
          value={value?.name}
          readOnly
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <label
          htmlFor="image"
          className="bg-primary rounded-lg px-2 h-[30px]  mx-[3px] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center text-white whitespace-nowrap "
        >
          Choose File
        </label>
      </div>
      <input
        type="file"
        id="image"
        name={name}
        accept="*"
        multiple={false}
        className="hidden"
        onChange={handleChange}
      />
    </Fragment>
  );
};

export default ImageField;
