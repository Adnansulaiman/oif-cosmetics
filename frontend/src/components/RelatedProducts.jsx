import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import 'swiper/css/free-mode';
import "swiper/css/scrollbar";
// import required modules
import { Scrollbar } from "swiper/modules";
import ProductList from './ProductList';


const RelatedProducts = ({category,id}) => {
    const [relatedData,setRelatedData] = useState(null);
    useEffect(()=>{
        const fetchRelatedProducts =async () =>{
            try{
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/related-products`,
                    {category:category}
                );
                // console.log(response.data);
                setRelatedData(response.data.products)
            }catch(err){
                console.log(err)
            }
        }
        fetchRelatedProducts()
    },[])
  return (
    <div className="flex flex-col mt-5 ">
        {/* {relatedData && (
        <div className=" px-4 md:px-12 pt-10">
          <h1 className="text-3xl font-bold">Related Products</h1>
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
              {relatedData?.map((product) => (
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
              {relatedData?.map((product) => (
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
              {relatedData?.map((product) => (
                <SwiperSlide key={product?._id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )} */}
      <ProductList products={relatedData} title='Related Products' />
    </div>
  )
}

export default RelatedProducts