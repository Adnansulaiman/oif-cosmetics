import React from "react";
import { FaFacebook,FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
    <div className="flex px-5 md:px-32 py-5 md:py-10 text-white flex-col w-full  bg-slate-950">
      <div className="flex md:flex-row flex-col justify-between border-b pb-5 md:pb-10">
        <div className="flex flex-col md:gap-3">
          <p className="text-3xl md:text-5xl font-black pr-52">OIF.</p>
          <p className="max-w-lg text-xs md:text-base font-semibold text-slate-300">
            Discover premium cosmetics crafted to enhance your natural beauty.
            We are committed to quality, sustainability, and inclusivity,
            offering products that inspire confidence and care.
          </p>
        </div>
        <div className="flex flex-col gap-5 md:gap-10">
          
          <div className="flex flex-col mt-10 md:mt-0 gap-2 md:gap-4">
            <p className="text-sm md:text-base font-semibold">NEWSLETTER</p>
            <div className="flex gap- items-center">
              <input
                type="email"
                className="text-black px-5 py-2 w-full bg-transparent border  rounded-s-xl"
                placeholder="Enter your email"
              />
              <button className="text-base border py-2 px-2 rounded-e-xl bg-white text-slate-950 font-semibold ">SUBSCRIBE</button>
            </div>
          </div>
          <div className="flex gap-10 md:gap-20">
            <p className="md:text-lg font-semibold">SHOP</p>
            <p className="md:text-lg font-semibold">ABOUT</p>
            <p className="md:text-lg font-semibold">CONTACT</p>
          </div>
        </div>
      </div>
      <div className="flex py-5 justify-between">
        <p className="text-xs md:text-base">{`© ${new Date().getFullYear()} OIF. All Rights Reserved.`}</p>
        <div className="flex gap-3 md:gap-5">
            <FaFacebook className="text-lg md:text-2xl" />
            <FaInstagram className="text-lg md:text-2xl"/>
            <FaXTwitter className="text-lg md:text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
