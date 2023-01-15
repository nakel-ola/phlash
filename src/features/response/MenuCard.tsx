import clsx from "clsx";

interface ItemsType {
  name: string;
}

interface Props {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const MenuCard = (props: Props) => {
  const { active, setActive } = props;
  let items: ItemsType[] = [
    { name: "Response" },
    { name: "Header" },
  ];
  return (
    <div className="flex items-center justify-between">
      {items.map((item: ItemsType, index: number) => (
        <button
          key={index}
          className={clsx(
            "flex-1 flex items-center justify-center h-[50px]  border-[1px]",
            items.length - 1 === index ? "border-r-0" : "",
            index === 0 ? "border-l-0" : "",
            active === index
              ? "border-transparent text-black dark:text-white"
              : "border-slate-100 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
          )}
          onClick={() => setActive(index)}
        >
          {item.name}{" "}
        </button>
      ))}
    </div>
  );
};

export default MenuCard;
