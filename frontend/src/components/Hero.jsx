import HeroImage from "../assets/images/hero-section-2.jpg";
import HeroGif from "../assets/images/hero-gif.gif";
import { Link } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import Lipstick from "../assets/images/lipstick-1.jpg";
// import ListItem from "../List/ListItem";


import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
// import required modules
import { Autoplay, FreeMode } from "swiper/modules";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Loading from "./Loading";
import ListItem from "./ListItem";

const Hero = () => {
  const { products, loading } = useContext(ProductContext);
  return (
    <>
    {loading && <Loading />}
      {products && (
        <div className="flex flex-col md:flex-row">
          {/* Hero Left Side */}
          <div
            className="w-screen md:w-1/2 h-full pb-10 md:pb-0 md:h-screen pt-28 md:pl-12 pl-4 bg-secondary bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${HeroGif})` }}
          >
            <div className="bg-gray-400  rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 p-4 md:p-6 mr-5">
              <h1 className="text-4xl  sm:text-6xl  text-left font-sans font-bold">
                Unleash Your Inner Beauty{" "}
              </h1>
              <p className=" sm:text-lg text-left pt-3 md:pt-6 text-slate-800 font-semibold">
                Discover our exclusive range of beauty and skincare products
                crafted for you
              </p>

              <Link className="flex items-center text-center  justify-end pr-1 bg-transparent mt-3 md:mt-5 border-2 border-black rounded-full w-44 h-12 md:w-52 md:h-14 hover:scale-105 ">
                <p className="pr-3 text-lg md:text-xl font-semibold">
                  Explore now
                </p>
                <div className="rounded-full w-10 h-10 md:w-12 md:h-12  border-2 border-black flex items-center justify-center">
                  <BsArrowUpRight className=" text-xl md:text-2xl" />
                </div>
              </Link>
            </div>
            <div className=" mt-10  md:mt-5 pr-5  md:mb-5">
              <div className="flex justify-between items-center  mb-10 md:mb-5">
                <h1 className="text-xl md:text-2xl font-semibold  ">
                  Recommended for you
                </h1>
                <p className="hover:underline">View all</p>
              </div>
              <div className="hidden md:flex">
                <Swiper
                  slidesPerView={3.3}
                  spaceBetween={0}
                  freeMode={true}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                  modules={[FreeMode, Autoplay]}
                  className="mySwiper"
                >
                 {products?.slice(0,6)?.map((product)=>(
                  <SwiperSlide key={product._id}><ListItem product={product} /></SwiperSlide>
                 ))}
                </Swiper>
              </div>
              <div className="flex gap-3 justify-center flex-wrap md:hidden">
              {products?.slice(0,4)?.map((product)=>(
                  <ListItem key={product?._id} product={product} />
                 ))}
              </div>
            </div>
          </div>
          {/* Hero Right Side */}
          <div
            className="w-screen md:w-1/2 flex items-end h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${HeroImage})` }}
          >
            <div className="flex  justify-end items-center pr-4 md:pr-12  gap-4 mb-4 w-full ">
              <div
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-cover flex items-end pb-3 bg-center"
                style={{ backgroundImage: `url(${Lipstick})` }}
              >
                {/* <h1 className="text-2xl ">Matte Luxe Lipstick</h1> */}
                <div className="flex w-full p-3 mx-3 rounded-2xl bg-white  justify-center items-center gap-6">
                  <p className="text-black md:text-lg">shades</p>
                  <ul className="flex gap-1 items-center">
                    <li className=" w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#A2001D]"></li>
                    <li className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#F4C2C2]"></li>
                    <li className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#FF6F61]"></li>
                    <li className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#D1B89F]"></li>
                  </ul>
                </div>
              </div>
              <div className="realtive bg-gray-400 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 w-48 h-48 md:w-64 md:h-64 text-white p-2 md:p-4">
                <h2 className="text-lg pt-8">Glamorous Glow</h2>
                <p className=" text-xs md:text-sm pt-4">
                  A luxurious matte lipstick with intense color payoff and a
                  long-lasting formula that feels weightless on the lips.
                </p>
                <div className="absolute top-0 right-0 m-2  ">
                  <BsArrowUpRight className="text-3xl md:text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
