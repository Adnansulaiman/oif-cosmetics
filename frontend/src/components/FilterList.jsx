import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import FilterItem from "./FilterItem";
const FilterList = ({
  openValue,
  setOpen,
  keyName,
  name,
  items,
  filters,
  setFilters,
}) => {
  return (
    <div className="flex flex-col pb-1 md:pb-2  border-0 border-b-2 border-black border-opacity-40 ">
      <div
        className="flex justify-between w-full items-center cursor-pointer my-3 md:my-2"
        onClick={() =>
          setOpen((prev) => ({ ...prev, [keyName]: !prev[keyName] }))
        }
      >
        <h1 className="text-sm md:text-lg font-semibold ">{name}</h1>
        {openValue ? (
          <LuMinus className=" md:text-xl" />
        ) : (
          <GoPlus className=" md:text-xl" />
        )}
      </div>
      {openValue && (
        <ul className="flex flex-col gap-1 md:gap-2 mb-2 md:mb-3 ease-in-out duration-500">
          {items?.map((item, index) => (
            <FilterItem key={index} item={item} filterKey={keyName} filters={filters} setFilters={setFilters} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterList;
