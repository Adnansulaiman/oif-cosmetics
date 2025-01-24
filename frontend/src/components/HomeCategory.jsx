import React from "react";
import { BsArrowRight } from "react-icons/bs";
import CollectionImage1 from '../assets/images/collection-image1.jpg'
import CollectionImage2 from '../assets/images/collection-image2.jpg'
import CollectionImage3 from '../assets/images/collection-image3.jpg'
const HomeCategory = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5  md:gap-8 pt-2 md:pt-5 pb-5 md:pb-10 px-4 md:px-12">
      <div style={{backgroundImage:`url(${CollectionImage2})`}} className=" w-full md:w-1/3 h-48 md:h-[451px] shadow-lg bg-center bg-cover rounded-xl flex flex-col justify-between px-6 md:px-10 py-4 md:py-6">
        <div className="flex flex-col  md:gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold">Summer Collection</h1>
          <p className="text-base md:text-lg font-medium text-slate-900">Starting at $20</p>
        </div>
        <div className="flex items-center gap-2 text-slate-900 ">
          <p className="text-base md:text-lg font-medium ">Shop Now</p>
          <BsArrowRight className="text-lg md:text-xl  mt-1" />
        </div>
      </div>
      <div style={{backgroundImage:`url(${CollectionImage1})`}} className=" w-full md:w-1/3 h-48 md:h-[451px] shadow-lg bg-center bg-cover rounded-xl flex flex-col justify-between px-6 md:px-10 py-4 md:py-6">
        <div className="flex flex-col  md:gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold">What's New</h1>
          <p className="text-base md:text-lg font-medium text-slate-900">Get the glow</p>
        </div>
        <div className="flex items-center gap-2 text-slate-900 ">
          <p className="text-base md:text-lg font-medium ">Discover Now</p>
          <BsArrowRight className="text-lg md:text-xl  mt-1" />
        </div>
      </div>
      <div style={{backgroundImage:`url(${CollectionImage3})`}} className=" w-full md:w-1/3 h-48 md:h-[451px] shadow-lg bg-center bg-cover rounded-xl flex flex-col justify-between px-6 md:px-10 py-4 md:py-6">
        <div className="flex flex-col  md:gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold">Buy 1 Get 1</h1>
          <p className="text-base md:text-lg font-medium text-slate-900">Starting at $39.99</p>
        </div>
        <div className="flex items-center gap-2 text-slate-900 ">
          <p className="text-base md:text-lg font-medium ">Shop Now</p>
          <BsArrowRight className="text-lg md:text-xl  mt-1" />
        </div>
      </div>
      
      
    </div>
  );
};

export default HomeCategory;
