import clsx from "clsx";
import { CloseCircle, SearchNormal1 } from "iconsax-react";
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";

export interface InputFieldProps<T = any> extends InputHTMLAttributes<T> {
  [key: string]: any;
  action?: any;
  error?: boolean;
  actionRight?: any;
  clearInput?: () => void;
  isPrice?: boolean;
  IconLeft?: any;
  IconRight?: ReactNode;
  inputClassName?: HTMLInputElement["className"];
  className?: HTMLDivElement["className"];
  value?: any;
  type?: HTMLInputElement["type"];
  readOnly?: HTMLInputElement["readOnly"];
  disableClear?: boolean;
}

function InputField(props: InputFieldProps, ref?: any) {
  // --- Destructing Props --- //
  const {
    value = "",
    error,
    IconLeft = SearchNormal1,
    actionRight,
    type = "text",
    action,
    readOnly = false,
    inputClassName,
    IconRight = null,
    className,
    clearInput,
    isPrice = false,
    onChange,
    disableClear = false,
    ...other
  } = props;

  const [focus, setFocus] = useState<boolean>(false);
  const [input, setInput] = useState<string>(value);

  return (
    <div
      className={clsx(
        "w-full rounded-lg flex items-center justify-center min-h-[35px] p-[5px] mt-[8px] mr-[8px] transition-all duration-300 ease hover:shadow-sm bg-slate-100 dark:bg-neutral-800 ring-2 ring-offset-2",
        error ? "ring-red-500" : "",
        focus
          ? "ring-primary/30 ring-offset-primary/80"
          : "ring-transparent ring-offset-transparent",
        className
      )}
    >
      {!value &&
        (IconLeft === "disabled" ? null : (
          <IconLeft
            size={20}
            className="text-[18px] mr-[5px] text-[#212121] dark:text-white"
          />
        ))}

      <input
        className={clsx(
          "text-[1rem] bg-transparent dark:text-white/90 border-none outline-none w-[95%] text-black dark:text-white mr-auto autofill:bg-transparent ",
          inputClassName
        )}
        ref={ref}
        type={type}
        value={input}
        readOnly={readOnly}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          setInput(e.target.value);
          onChange?.(e);
        }}
        {...other}
      />

      {input && !disableClear && type !== "date" && !readOnly && (
        <CloseCircle
          variant="Bold"
          size={25}
          onClick={() => {
            setInput("")
            clearInput?.();
          }}
          className="px-[2px] text-[#212121] dark:text-neutral-300"
        />
      )}

      {IconRight && IconRight}
    </div>
  );
}

export default forwardRef(InputField);
