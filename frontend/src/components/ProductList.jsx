import React from 'react'
import ProductCard from "./ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import 'swiper/css/free-mode';
import "swiper/css/scrollbar";
// import required modules
import { Scrollbar } from "swiper/modules";
// import { useContext } from "react";
// import {  useProduct } from "../context/ProductContext";

import Loading from "./Loading";
const ProductList = ({title,products}) => {
    
  return (
    <>
      {products && (
        <div className=" px-4 md:px-12 py-8">
          <h1 className="text-xl md:text-3xl font-semibold">{title}</h1>
          <div className="hidden md:flex">
            <Swiper
              slidesPerView={4.5}
              spaceBetween={0}
              // freeMode={true}

              scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar]}
              className="mySwiper "
              style={{ width: "100%", overflow: "hidden" }}
            >
              {products?.map((product) => (
                <SwiperSlide key={product?._id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex justify-center sm:hidden">
            <Swiper
              slidesPerView={2.1}
              spaceBetween={0}
              // freeMode={true}

              scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar]}
              className="mySwiper  "
              style={{ width: "100%", overflow: "hidden" }}
            >
              {products?.map((product) => (
                <SwiperSlide key={product?._id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex  justify-center max-sm:hidden md:hidden">
            <Swiper
              slidesPerView={3}
              spaceBetween={0}
              // freeMode={true}

              scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar]}
              className="mySwiper  "
              style={{ width: "100%", overflow: "hidden" }}
            >
              {products?.map((product) => (
                <SwiperSlide key={product?._id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
      {/* {loading && (
        <Loading />
      )} */}
    </>
  )
}

export default ProductList



