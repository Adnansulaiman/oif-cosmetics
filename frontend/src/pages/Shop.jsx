import ShopThumb from "../assets/images/shop-image-1.jpg";
import ProductCard from "../components/ProductCard";
import ShopFilter from "../components/ShopFilter";
// import { IoIosClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";
import {  useProduct } from "../context/ProductContext";
import Loading from "../components/Loading";
// import axios from "axios";

const Shop = () => {
  

  // const [refresh,setRefresh] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setFilterOpen]);

  const { products, loading, updateFilters } = useProduct();

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleClearFilters = () => {
    updateFilters({
      category: [],
      skinType: [],
      ingredients: [],
    });
  };
  //Search algorithm 
  const [searchQuery,setSearchQuery] = useState('');
  const handleSearchChange = (e) =>{
    // console.log(e.target.value);
    setSearchQuery(e.target.value);
  }
  const filteredData = products.filter(item => {
    return(
      item?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.brand.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
  })
  return (
    <>
      {products && (
        <div className="bg-contain bg-secondary ">
          <div className="pt-24 mx-4  md:mx-12 text-white ">
            <div
              className=" relative rounded-2xl h-52 md:h-96 bg-cover bg-center p-10"
              style={{ backgroundImage: `url(${ShopThumb})` }}
            >
              <h1 className="text-3xl md:text-7xl font-bold max-w-5xl  ">
                We Know Everthing About Your Skin .
              </h1>
              <p className="text-sm md:text-lg mt-3">
                Discover your natural beauty with a marketplace of skincare
                products from the world's best brands{" "}
              </p>
              <div className="absolute bottom-2 md:bottom-5 right-3 md:right-10 flex justify-end  w-full ">
                <input
                  className="w-1/2 h-8 md:h-12 px-5 md:text-base text-sm text-white placeholder:text-sm md:placeholder:text-base placeholder:text-white border-2 border-white rounded-full bg-transparent focus:border-white focus:outline-none focus:caret-white placeholder:caret-white"
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="flex absolute top-1 right-1 bg-white border-2 border-white rounded-full p-1 md:p-2 ">
                  <IoSearch className=" text-xs md:text-xl text-black" />
                </div>
              </div>
            </div>
            <div className="flex mt-6 gap-4">
              {/* <ShopFilter /> */}
              <div className="bg-gray-400 pb-10  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 w-full   rounded-2xl flex flex-col text-black ">
                {filterOpen && (
                  <div className="" ref={filterRef}>
                    <ShopFilter
                      // filters={filters} setFilters={setFilters}
                      onFilterChange={handleFilterChange}
                    />
                  </div>
                )}
                <div className=" bg-gray-100 py-4 m-2 rounded-lg flex justify-between px-5 items-center">
                  <div
                    className="flex  justify-center cursor-pointer items-center"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <p className="font-semibold">Filter</p>
                    <CiFilter className="mt-1" />
                  </div>
                  <div className="flex justify-center cursor-pointer items-center gap-10">
                    <p
                      onClick={handleClearFilters}
                      className="text-sm font-semibold hover:underline"
                    >
                      Clear all
                    </p>
                    <div className="flex gap-1 justify-center cursor-pointer items-center">
                      <p className="font-semibold">Sort</p>
                      <IoIosArrowDown className="mt-1" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 md:gap-10  justify-center flex-wrap px-11 ">
                  {filteredData?.length ? (
                    filteredData.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  ) : (
                    <p className="text-gray-500 text-xl mt-5 font-semibold ">
                      No products match your filters.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <Loading />}
    </>
  );
};

export default Shop;
