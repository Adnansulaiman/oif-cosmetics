import React from "react";
import Image1 from "../assets/images/about-image1.jpeg";
import Image2 from "../assets/images/about-image4.jpg";
import Image3 from "../assets/images/about-image3.jpg";
const About = () => {
  return (
    <div className="flex flex-col mb-10 md:mb-20 ">
      <div
        className="flex items-center bg-center bg-cover w-full h-screen md:h-[80vh]"
        style={{ backgroundImage: `url(${Image1})` }}
      >
        <div className="flex flex-col gap-3 pb-96 md:pb-0 md:gap-5 px-5 md:px-20">
          <h1 className="text-4xl md:text-5xl font-semibold text-center md:text-left">About Our Brand</h1>
          <p className="text-base md:text-lg text-slate-800 max-w-xl">
            At OIF, we believe beauty goes beyond skin deep. Founded with a
            vision to empower individuals, our journey began with a passion for
            creating high-quality cosmetics that celebrate every shade, skin
            type, and personality.
          </p>
        </div>
      </div>
      <div className="flex gap-3 md:gap-5 flex-col justify-center items-center w-full py-5 md:py-14">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl md:text-4xl font-bold">What We Offer</h1>
          <div className="w-1/2 h-0.5   bg-green-700 rounded-full"></div>
        </div>
        <p className="text-sm md:text-lg text-center text-slate-800 max-w-4xl">
          Our carefully curated collection features a wide range of products,
          from nourishing skincare to vibrant makeup essentials. Each product is
          crafted using premium ingredients to ensure you feel confident,
          radiant, and unapologetically you.
        </p>
      </div>
      <div className="flex  md:flex-row  bg-gray-200 ">
        <div className="md:w-1/2   w-full h-[50vh]  md:h-[70vh] flex flex-col gap-3  justify-center items-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl md:text-4xl font-bold ">Our Commitment to You</h1>
            <div className="w-1/2 h-0.5   bg-orange-600 rounded-full"></div>
          </div>
          <p className="text-sm md:text-lg text-center text-slate-800 max-w-xl">
            From exceptional quality to outstanding customer service, we’re
            dedicated to ensuring your experience with OIF is nothing short of
            extraordinary.
          </p>
        </div>
        <div
          className=" md:w-1/2 w-full bg-center rounded-s-3xl bg-cover"
          style={{ backgroundImage: `url(${Image2})` }}
        ></div>
      </div>
      <div className="flex bg-gray-200 pt-5 md:pt-10">
        <div
          className="w-1/2 bg-center rounded-e-3xl bg-cover"
          style={{ backgroundImage: `url(${Image3})` }}
        ></div>
        <div className="w-1/2 h-[50vh] md:h-[70vh] flex flex-col gap-3  justify-center items-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl md:text-4xl font-bold ">Join the Journey</h1>
            <div className="w-1/2 h-0.5   bg-red-700 rounded-full"></div>
          </div>
          <p className="text-sm md:text-lg text-center text-slate-800 max-w-xl">
            Be part of our growing community of beauty enthusiasts. Follow us on
            social media, explore our collections, and discover the magic of
            self-care and self-expression with OIF.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
