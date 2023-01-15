import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  AddCircle,
  Edit,
  Folder2,
  FolderOpen,
  More,
  Trash,
} from "iconsax-react";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupRequest, Request } from "../../../typings";
import { Menu } from "../../components/menu/menu";
import { Transition } from "../../components/transitions/transition";
import { add } from "../../redux/features/dialogSlice";
import { selectSelected } from "../../redux/features/requestsSlice";
import Card from "./Card";

interface Props extends GroupRequest {
  active: string | number | null;
  setActive: React.Dispatch<React.SetStateAction<string | number | null>>;
  filters: string[];
}

const Cards = (props: Props) => {
  const { active, setActive, id, name, requests, filters } = props;

  const requestState = useSelector(selectSelected);

  const handleClick = () => {
    if (active === id) setActive("");
    else setActive(id);
  };

  let newRequest = () => {
    return requests.filter((item) => {
      if (filters.length > 0) {
        return filters.includes(item.method);
      }
      return item;
    });
  };

  return (
    <div
      className={clsx(
        "my-2 transition-all duration-300 ",
        active === id ? "" : "overflow-y-hidden"
      )}
      style={{
        height: active === id ? `${newRequest().length * 55 + 67}px` : "51px",
      }}
    >
      <Menu
        as="div"
        className={clsx(
          "group p-2 mb-2 h-[51px] flex items-center rounded-lg justify-between cursor-pointer hover:bg-slate-100 hover:dark:bg-neutral-800"
        )}
      >
        <div className="flex items-center flex-1" onClick={handleClick}>
          <div className="w-[35px] h-[35px] flex items-center justify-center">
            {active === id ? (
              <FolderOpen size={25} className="text-black dark:text-white" />
            ) : (
              <Folder2 size={25} className="text-black dark:text-white" />
            )}
          </div>

          <p className="pl-2 text-black dark:text-white">{name}</p>
        </div>

        <Menu.Button className="w-[35px] h-[35px] flex items-center justify-center hover:bg-white hover:dark:bg-dark rounded-full">
          <More className="text-black dark:text-white rotate-90" />
        </Menu.Button>
        <MoreCard groupId={id} name={name} />
      </Menu>

      <div className={clsx("w-full flex transition-all duration-300")}>
        <div className="w-[95%] ml-auto">
          {newRequest().map((request: Request, index: number) => (
            <Card key={index} {...request} groupId={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MoreCard = ({
  groupId,
  name,
}: {
  groupId: string | number;
  name: string;
}) => {
  const dispatch = useDispatch();
  const items = [
    {
      Icon: Edit,
      name: "Rename group",
      onClick: () => {
        dispatch(
          add({
            type: "rename",
            data: {
              groupId,
              name,
            },
          })
        );
      },
    },
    {
      Icon: AddCircle,
      name: "Create Request",
      onClick: () => {
        dispatch(
          add({
            type: "create",
            data: {
              groupId,
              type: "request",
            },
          })
        );
      },
    },
    {
      Icon: Trash,
      name: "Delete Group",
      onClick: () => {
        dispatch(
          add({
            type: "delete",
            data: {
              groupId,
              name,
            },
          })
        );
      },
    },
  ];
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
      <Menu.Items className="absolute right-0 z-10 mt-2 min-w-36 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-md shadow-slate-100 dark:shadow-black/10 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
        <div className="">
          {items.map(({ Icon, name, onClick }, index: number) => (
            <Menu.Item key={index}>
              <div
                className="flex items-center p-2 pr-4 hover:bg-slate-100 hover:dark:bg-dark"
                onClick={onClick}
              >
                <div className="h-[30px] w-[30px] flex items-center justify-center">
                  <Icon className="text-black dark:text-white"/>
                </div>

                <p className="whitespace-nowrap pl-2 text-sm text-black dark:text-white">{name}</p>
              </div>
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  );
};

export default Cards;
