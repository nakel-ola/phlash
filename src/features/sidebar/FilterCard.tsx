import clsx from "clsx";
import {
  Component,
  Filter,
  TickSquare,
} from "iconsax-react";
import React, { ChangeEvent, FormEvent, Fragment, useState } from "react";
import InputField from "../../components/InputField";
import { Menu } from "../../components/menu/menu";
import { Transition } from "../../components/transitions/transition";
import { statusbg, statusColor } from "../../utils/statusColor";

interface Props {
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onClear?(): void;
  onSubmit?(e: FormEvent): void;
  onItemClick?: React.Dispatch<React.SetStateAction<string[]>>;
  filter?: Array<string>;
}

const FilterCard = (props: Props) => {
  const {
    onChange,
    value,
    onClear,
    onSubmit,
    filter,
    onItemClick,
  } = props;
  const [text, setText] = useState(value ?? "");

  const items = ["Get", "Post", "Patch", "Put", "Delete"];

  const [active, setActive] = useState<Array<string>>(filter!);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  const handleAdd = (item: string) => {
    let index = active.indexOf(item);

    if (index === -1) {
      setActive([...active, item]);
      onItemClick?.([...active, item]);
    } else {
      let newActive = [...active];
      newActive.splice(index, 1);
      setActive(newActive);
      onItemClick?.(newActive);
    }
  };

  return (
    <div className="flex items-center mx-2 h-[35px] justify-between">
      <form onSubmit={handleSubmit} className="w-[80%]">
        <InputField
          type="text"
          placeholder="Search"
          value={text}
          onChange={(e: any) => {
            onChange?.(e);
            setText(e.target.value);
          }}
          clearInput={() => {
            onClear?.();
            setText("");
          }}
          className="py-1 ml-2"
        />

        <button type="button" className="hidden"></button>
      </form>

      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className="shrink-0 w-[35px] h-[35px] flex items-center justify-center hover:scale-105 active:scale-95 hover:bg-slate-100 hover:dark:bg-neutral-800 rounded-full mx-2"
        >
          <Filter size={25} className="text-black dark:text-white" />
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-md shadow-slate-100 dark:shadow-black/10 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
            <div className="">
              {items.map((item, index: number) => (
                <div
                  key={index}
                  className={clsx(
                    "flex items-center mx-2 my-1  h-[40px] rounded-lg cursor-pointer ",
                    active.indexOf(item) !== -1
                      ? statusbg(item)
                      : "hover:bg-slate-100 hover:dark:bg-neutral-800"
                  )}
                  onClick={() => handleAdd(item)}
                >
                  <div className="h-[35px] w-[35px] flex items-center justify-center">
                    {active.indexOf(item) === -1 ? (
                      <Component className="text-black dark:text-white rotate-45" />
                    ) : (
                      <TickSquare
                        variant="Bold"
                        className={clsx(statusColor(item))}
                      />
                    )}
                  </div>
                  <p className={clsx("pl-2 font-medium", statusColor(item))}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default FilterCard;
