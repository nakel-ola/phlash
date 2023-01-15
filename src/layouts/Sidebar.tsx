import axios from "axios";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { Add, More } from "iconsax-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GroupRequest } from "../../typings";
import Loader from "../components/Loader";
import FilterCard from "../features/sidebar/FilterCard";
import Navbar from "../features/sidebar/Navbar";
import { add, selectDialog } from "../redux/features/dialogSlice";
import {
  createGroups,
  selectGroupRequests,
} from "../redux/features/requestsSlice";

const AddCard = dynamic(() => import("../features/sidebar/AddCard"), {
  ssr: false,
});
const DeleteCard = dynamic(() => import("../features/sidebar/DeleteCard"), {
  ssr: false,
});
const MenuCard = dynamic(() => import("../features/sidebar/MenuCard"), {
  ssr: false,
});
const RenameCard = dynamic(() => import("../features/sidebar/RenameCard"), {
  ssr: false,
});
const Cards = dynamic(() => import("../features/sidebar/Cards"), {
  ssr: false,
});

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const isHome = !router.query?.id;
  const [input, setInput] = useState("");
  const [active, setActive] = useState<string | number | null>(null);
  const items = useSelector(selectGroupRequests);
  const dialogState = useSelector(selectDialog);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  let newItems = () => {
    return items.filter((item) =>
      item.name?.toLowerCase()?.includes(input.toLowerCase())
    );
  };

  const handleFolders = useCallback(async () => {
    setLoading(true);
    await axios.get("/api/get-folders").then(({ data }) => {
      dispatch(createGroups(data));
    });
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    handleFolders();
  }, [handleFolders]);

  return (
    <div
      className={clsx(
        "h-full overflow-hidden border-r-[2px] border-r-slate-100 dark:border-r-neutral-800 relative",
        isHome
          ? "col-span-11 md:col-span-4 lg:col-span-3 "
          : "hidden md:inline-block col-span-4 lg:col-span-3"
      )}
    >
      <div className="relative">
        <Navbar onMoreClick={() => setOpen(!open)} />
        <FilterCard
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClear={() => setInput("")}
          filter={filters}
          onItemClick={setFilters}
        />

        {!loading ? (
          <div className="mx-2 pt-6 pb-8 my-2 pr-2 h-[calc(100vh-120px)] w-[calc(100%-10px)] overflow-y-scroll">
            {newItems().map((item: GroupRequest, index: number) => (
              <Cards
                key={index}
                {...item}
                active={active}
                setActive={setActive}
                filters={filters}
              />
            ))}

            {newItems().length === 0 ? (
              <div className="grid place-items-center h-full w-full">
                <button
                  className="bg-slate-100 dark:bg-neutral-800 rounded-full hover:scale-105 active:scale-95 transition-transform duration-300"
                  onClick={() => dispatch(add({ type: "create" }))}
                >
                  <Add size={80} className="text-black dark:text-white" />
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="h-[calc(100vh-120px)] w-[calc(100%-10px)] grid place-items-center">
            <Loader />
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && <MenuCard onClose={() => setOpen(false)} />}
        {dialogState.create.open && <AddCard />}
        {dialogState.rename.open && <RenameCard />}
        {dialogState.delete.open && <DeleteCard />}
      </AnimatePresence>
    </div>
  );
}
