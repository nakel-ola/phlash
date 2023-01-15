import clsx from "clsx";
import { Edit, More, Trash } from "iconsax-react";
import { useRouter } from "next/router";
import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Request } from "../../../typings";
import { Menu } from "../../components/menu/menu";
import { Transition } from "../../components/transitions/transition";
import { add } from "../../redux/features/dialogSlice";
import {
  addSelected,
  selectSelected,
} from "../../redux/features/requestsSlice";
import { statusColor, statusbg } from "../../utils/statusColor";

interface Props extends Request {
  groupId: string | number;
}

const Card = (props: Props) => {
  const { id, method, title, url, groupId } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const requestState = useSelector(selectSelected);

  let isSelected = requestState?.id === id && requestState.groupId === groupId;
  let pathId = router.query?.id?.toString()!;
  let isPath = pathId === id;

  const handleClick = useCallback(() => {
    dispatch(addSelected({ groupId, request: { id, method, title, url } }));
    if (!isPath) router.push(`/${id}`);
  }, [dispatch, groupId, id, isPath, method, router, title, url]);

  useEffect(() => {
    if (isPath && !isSelected) {
      handleClick();
    }
  }, [handleClick, isPath, isSelected]);

  return (
    <div
      className={clsx(
        "group p-2 my-1 h-[51px] rounded-lg cursor-pointer flex items-center justify-between",
        isSelected
          ? "bg-slate-100 dark:bg-neutral-800"
          : "hover:bg-slate-100 hover:dark:bg-neutral-800"
      )}
    >
      <div className="flex items-center h-[51px] flex-1" onClick={handleClick}>
        <div
          className={clsx(
            "px-2 rounded-md mr-2 uppercase text-sm flex items-center font-bold font-mono",
            statusbg(method)
          )}
        >
          <p className={clsx("font-bold", statusColor(method))}>{method}</p>
        </div>
        <p className="text-sm text-black dark:text-white">{title}</p>
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="hidden h-[35px] w-[35px] group-hover:flex items-center justify-center">
          <More className="text-black dark:text-white rotate-90" />
        </Menu.Button>

        <MoreCard
          groupId={groupId}
          id={id}
          name={title}
          request={{ id, method, title, url }}
        />
      </Menu>
    </div>
  );
};

const MoreCard = ({
  groupId,
  name,
  id,
  request,
}: {
  groupId: string | number;
  id: string | number;
  name: string;
  request: Request;
}) => {
  const dispatch = useDispatch();

  const items = [
    {
      Icon: Edit,
      name: "Rename",
      onClick: () => {
        dispatch(
          add({
            type: "rename",
            data: {
              groupId,
              name,
              request,
            },
          })
        );
      },
    },
    {
      Icon: Trash,
      name: "Delete",
      onClick: () => {
        dispatch(
          add({
            type: "delete",
            data: {
              groupId,
              name,
              id,
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
      <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-md shadow-slate-100 dark:shadow-black/10 ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
        <div className="">
          {items.map(({ Icon, name, onClick }, index: number) => (
            <Menu.Item key={index}>
              <div
                className="flex items-center p-2 pr-4 hover:bg-slate-100 hover:dark:bg-dark"
                onClick={onClick}
              >
                <div className="h-[30px] w-[30px] flex items-center justify-center">
                  <Icon />
                </div>

                <p className="whitespace-nowrap pl-2 text-sm">{name}</p>
              </div>
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Transition>
  );
};

export default Card;
