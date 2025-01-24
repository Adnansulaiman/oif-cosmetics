import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineGppGood } from "react-icons/md";
import { BiLeaf } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Autoplay, FreeMode } from "swiper/modules";
// import { Pagination } from "swiper/modules";

const OurBenifits = () => {
  return (
    <>
      <div className="hidden md:flex  my-10 py-8 mx-12 bg-gray-100 rounded-xl ">
        <div className="flex px-5 gap-3 flex-col items-center border-e border-slate-300 ">
          <MdOutlineGppGood className="text-5xl" />
          <h1 className="text-xl font-semibold">Premium Quality</h1>
          <p className="text-sm text-slate-700 text-center">
            Our cosmetics are crafted with the finest ingredients, ensuring safe
            and stunning results every time.
          </p>
        </div>

        <div className="flex gap-3 px-5 flex-col items-center border-e border-slate-300 ">
          <BiLeaf className="text-5xl" />
          <h1 className="text-xl font-semibold">Eco-Friendly</h1>
          <p className="text-sm text-slate-700 text-center">
            Beauty that cares! All our products are cruelty-free and come in
            sustainable packaging.
          </p>
        </div>

        <div className="flex gap-3 px-5 flex-col items-center border-e border-slate-300 ">
          <LiaShippingFastSolid className="text-5xl" />
          <h1 className="text-xl font-semibold">Fast & Reliable Shipping</h1>
          <p className="text-sm text-slate-700 text-center">
            Get your orders delivered to your doorstep quickly with our trusted
            logistics partners.
          </p>
        </div>
        <div className="flex gap-3 px-5 flex-col items-center ">
          <RiSecurePaymentLine className="text-5xl" />
          <h1 className="text-xl font-semibold">Safe & Secure Payments</h1>
          <p className="text-sm text-slate-700 text-center">
            Shop with confidence using our secure payment options, including COD
            and online payments.
          </p>
        </div>
      </div>
      <div className="flex md:hidden  my-5 py-4 mx-4 bg-gray-200 rounded-xl ">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
        //   pagination={{
        //     dynamicBullets: true,
        //   }}
          freeMode={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex px-10 gap-1 flex-col items-center ">
              <MdOutlineGppGood className="text-4xl" />
              <h1 className="text-lg font-semibold">Premium Quality</h1>
              <p className="text-xs text-slate-700 text-center">
                Our cosmetics are crafted with the finest ingredients, ensuring
                safe and stunning results every time.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex px-10 gap-1 flex-col items-center ">
              <BiLeaf className="text-4xl" />
              <h1 className="text-lg font-semibold">Eco-Friendly</h1>
              <p className="text-xs text-slate-700 text-center">
                Beauty that cares! All our products are cruelty-free and come in
                sustainable packaging.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex px-10 gap-1 flex-col items-center ">
              <LiaShippingFastSolid className="text-4xl" />
              <h1 className="text-lg font-semibold">
                Fast & Reliable Shipping
              </h1>
              <p className="text-xs text-slate-700 text-center">
                Get your orders delivered to your doorstep quickly with our
                trusted logistics partners.{" "}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex px-10 gap-1 flex-col items-center ">
              <RiSecurePaymentLine className="text-4xl" />
              <h1 className="text-lg font-semibold">Safe & Secure Payments</h1>
              <p className="text-xs text-slate-700 text-center">
                Shop with confidence using our secure payment options, including
                COD and online payments.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* <div className="flex gap-3 px-5 flex-col items-center border-e border-slate-300 ">
            <BiLeaf className='text-5xl' />
            <h1 className='text-xl font-semibold'>Eco-Friendly</h1>
            <p className='text-sm text-slate-700 text-center'>Beauty that cares! All our products are cruelty-free and come in sustainable packaging.</p>
        </div>
        
        <div className="flex gap-3 px-5 flex-col items-center border-e border-slate-300 ">
            <LiaShippingFastSolid className='text-5xl' />
            <h1 className='text-xl font-semibold'>Fast & Reliable Shipping</h1>
            <p className='text-sm text-slate-700 text-center'>Get your orders delivered to your doorstep quickly with our trusted logistics partners.</p>
        </div>
        <div className="flex gap-3 px-5 flex-col items-center ">
            <RiSecurePaymentLine className='text-5xl' />
            <h1 className='text-xl font-semibold'>Safe & Secure Payments</h1>
            <p className='text-sm text-slate-700 text-center'>Shop with confidence using our secure payment options, including COD and online payments.</p>
        </div> */}
      </div>
    </>
  );
};

export default OurBenifits;
