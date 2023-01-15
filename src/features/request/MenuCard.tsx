import clsx from "clsx";
import { ArrowDown2 } from "iconsax-react";
import React, { Fragment } from "react";
import { Menu } from "../../components/menu/menu";
import { Transition } from "../../components/transitions/transition";

interface Dropdown {
  name: string;
  onClick(): void;
}

interface ItemsType {
  name: string;
  dropdown?: Array<Dropdown>;
}

interface Props {
  active: {
    parent: number;
    child: number;
  };
  setActive: React.Dispatch<
    React.SetStateAction<{
      parent: number;
      child: number;
    }>
  >;
}

const MenuCard = (props: Props) => {
  const { active, setActive } = props;
  let items: ItemsType[] = [
    {
      name: "Body",
      dropdown: [
        {
          name: "Json",
          onClick: () => {},
        },
        {
          name: "Text",
          onClick: () => {},
        },
        {
          name: "Form",
          onClick: () => {},
        },
        {
          name: "Graphql",
          onClick: () => {},
        },
      ],
    },
    {
      name: "Auth",
      dropdown: [
        {
          name: "Basic",
          onClick: () => {},
        },
        {
          name: "Bearer",
          onClick: () => {},
        },
      ],
    },
    { name: "Query" },
    { name: "Header" },
  ];
  return (
    <Fragment>
      <div className="flex items-center justify-between">
        {items.map((item: ItemsType, index: number) => (
          <Menu
            key={index}
            as="div"
            className="relative text-left inline-block w-full"
          >
            <Menu.Button
              className={clsx(
                "relative mx-auto w-full flex items-center justify-center h-[50px] border-[1px]",
                items.length - 1 === index ? "border-r-0" : "",
                index === 0 ? "border-l-0" : "",
                active.parent === index
                  ? "border-transparent text-black dark:text-white font-extrabold bg-slate-100 dark:bg-neutral-800"
                  : "border-slate-100 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
              )}
              onClick={() =>
                setActive(
                  active.parent === index
                    ? { ...active, parent: index }
                    : { parent: index, child: 0 }
                )
              }
            >
              {item.name}
              {item.dropdown ? (
                <ArrowDown2
                  size={20}
                  variant="Bold"
                  className="text-black dark:text-white ml-2"
                />
              ) : null}
            </Menu.Button>
            {item.dropdown ? (
              <MenuItems items={item.dropdown} setActive={setActive} />
            ) : null}
          </Menu>
        ))}
      </div>
    </Fragment>
  );
};

interface MenuItemsProps {
  items: Array<Dropdown>;
  setActive: Props["setActive"];
}

const MenuItems = (props: MenuItemsProps) => {
  const { items, setActive } = props;
  return (
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
          {items.map(({ name }, index) => (
            <Menu.Item key={index}>
              <a
                href="#"
                className={clsx(
                  "bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 block px-4 py-2 text-sm"
                )}
                onClick={() => setActive((prev) => ({ ...prev, child: index }))}
              >
                {name}
              </a>
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  );
};

export default MenuCard;
