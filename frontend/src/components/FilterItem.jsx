import React from "react";

const FilterItem = ({ item, filterKey, filters, setFilters }) => {
  const handleChange = (e) => {
    const { checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [filterKey]: checked
        ? [...prev[filterKey], item]
        : prev[filterKey].filter((i) => i !== item),
    }));
  };
  return (
    <li className="flex gap-2 md:gap-4 items-center">
      <input type="checkbox" onChange={handleChange} className="w-3 h-3 md:w-4 md:h-4" />
      <p className="text-xs md:text-base ">{item}</p>
    </li>
  );
};

export default FilterItem;
