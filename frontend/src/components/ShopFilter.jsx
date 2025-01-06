import { useState } from "react";

import FilterList from "./FilterList";

const categoryItem = [
  "Body Care",
  "Toners",
  "Serums",
  "Face Creams",
  "Eye & Up care",
  "masks & Treatments",
];
const skinTypeItem = ["Dry", "Oily", "Combination", "Sensitive"];
const ingredientsItem = [
  "With Vitamin E",
  "Cruelty-Free",
  "Parabean-Free",
  "Naturals Oils",
];
// const priceItem = [
//   "$1000 - More",
//   "$500 - $999",
//   "$100 - $499",
//   "$50 - $99",
//   "$1 - $49",
// ];

const ShopFilter = ({ filters, setFilters }) => {
  const [open, setOpen] = useState({
    category: false,
    // price: false,
    skinType: false,
    ingredients: false,
  });
  return (
    <div className="bg-gray-400 z-40 top-16 left-2 absolute bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 w-1/2 md:w-1/4 p-4 md:p-10 flex flex-col md:gap-5   rounded-2xl text-black">
      <FilterList
        openValue={open?.category}
        setOpen={setOpen}
        keyName="category"
        name="Category"
        items={categoryItem}
        filters={filters}
        setFilters={setFilters}
      />
      {/* <FilterList
        openValue={open?.price}
        setOpen={setOpen}
        keyName="price"
        name="Price"
        items={priceItem}
        filters={filters}
        setFilters={setFilters}
      /> */}
      <FilterList
        openValue={open?.skinType}
        setOpen={setOpen}
        keyName="skinType"
        name="Skin Type"
        items={skinTypeItem}
        filters={filters}
        setFilters={setFilters}
      />
      <FilterList
        openValue={open?.ingredients}
        setOpen={setOpen}
        keyName="ingredients"
        name="Ingredients"
        items={ingredientsItem}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default ShopFilter;
