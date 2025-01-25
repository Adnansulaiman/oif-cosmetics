import React from "react";
import NewCollectionImage from "../assets/images/newcollection-image1.jpg";
import { BsArrowRight } from "react-icons/bs";

const HomeBanner = () => {
  return (
    <div
      className="flex px-6 md:px-12 py-5 md:py-20 bg-center bg-cover md:rounded-xl md:h-[70vh] mb-5  md:mx-12 "
      style={{ backgroundImage: `url(${NewCollectionImage})` }}
    >
      <div className="flex  flex-col md:gap-3 text-slate-950 ">
        <h3 className="text-xl md:text-2xl font-semibold text-slate-800">New Collection</h3>
        <h1 className="text-4xl md:text-5xl font-bold max-w-xl ">
          Discover Our Auntum Skincare
        </h1>
        <p className="text-sm md:text-lg font-medium  max-w-2xl text-slate-800">
          Fall in love with your skin this season with products crafted to
          soothe dryness, lock in moisture, and enhance your natural beauty.
        </p>
        <p className="flex gap-2 items-center justify-center px md:px-2 md:text-xl font-semibold border border-black text-center rounded-xl mt-4  text-black  py-2 md:py-3 w-1/3 md:w-1/4">Explore Now <BsArrowRight className="text-lg md:text-2xl mt-1" /></p>
      </div>
    </div>
  );
};

export default HomeBanner;
