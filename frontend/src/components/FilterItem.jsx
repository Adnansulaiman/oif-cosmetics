import React from "react";
import { useProduct } from "../context/ProductContext";

const FilterItem = ({ item, filterKey }) => {
  const { filters, updateFilters } = useProduct();
  const handleChange = (e) => {
    const { checked } = e.target;
    updateFilters({
      [filterKey]: checked
        ? [...filters[filterKey], item]
        : filters[filterKey].filter((i) => i !== item),
    });
  };
  return (
    <li className="flex gap-2 md:gap-4 items-center">
      <input
        type="checkbox"
        checked={filters[filterKey]?.includes(item)} 
        onChange={handleChange}
        className="w-3 h-3 md:w-4 md:h-4"
      />
      <p className="text-xs md:text-base ">{item}</p>
    </li>
  );
};

export default FilterItem;
