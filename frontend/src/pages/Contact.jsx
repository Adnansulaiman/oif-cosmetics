import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { CiPhone, CiMail, CiTimer, CiLocationOn } from "react-icons/ci";

const Contact = () => {
  return (
    <div className="py-24 md:py-28 px-6 md:px-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-6xl font-black">Get in touch</h1>
        <p className="md:text-lg text-slate-600 max-w-4xl">
          Whether you have questions about our products, need assistance with
          your order, or simply want to share your feedback, we’d love to hear
          from you.
        </p>
      </div>
      <div className="flex flex-col md:flex-row mt-5 md:mt-10 gap-10 md:gap-5 ">
        <div className="flex flex-col md:pe-10 gap-5 md:gap-10 w-full md:w-1/2 border-b md:border-b-0 pb-5 md:pb-0 md:border-e border-slate-500">
          <h1 className="text-2xl md:text-3xl font-bold">Drop Us a Message</h1>
          <form className="flex flex-col gap-5 md:gap-10">
            <div className="flex gap-5 w-full">
              <div className="flex flex-col w-full">
                <label htmlFor="" className="text-base md:text-lg font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  className="border-b-2 border-black w-full  focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="" className="text-base md:text-lg  font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="border-b-2 border-black w-full  focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-5 w-full">
              <div className="flex flex-col w-full">
                <label htmlFor="" className="text-base md:text-lg  font-semibold">
                  Phone Number
                </label>
                <input
                  type="number"
                  className="border-b-2 border-black w-full bg-transparent  focus:outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="" className="text-base md:text-lg   font-semibold">
                  Subject
                </label>
                <input
                  type="text"
                  className="border-b-2 border-black w-full bg-transparent   focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="" className="text-base md:text-lg  font-semibold">
                Message
              </label>
              <textarea
                rows={4}
                className="border-b-2 border-black w-full bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex justify-end">
              <button className="flex items-center justify-center gap-2 border border-black px-10 py-3 text-lg font-semibold bg-black text-white rounded-md">
                Submit
                <BsArrowRight className="text-2xl" />
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-5 md:gap-10 md:px-20">
          <h1 className="text-2xl md:text-3xl font-bold">Contact Information</h1>
          <div className="flex flex-col gap-3 text-slate-700">
            <p className="flex items-center text-lg font-semibold gap-1">
              <CiPhone className="text-2xl" />
              +1 (123) 456-7890
            </p>
            <p className="flex items-center text-lg font-semibold gap-1">
              <CiMail className="text-2xl" />
              support@oif.com
            </p>
            <p className="flex items-center text-lg font-semibold gap-1">
              <CiTimer className="text-2xl" />
              Monday to Friday, 9:00 AM – 6:00 PM
            </p>
          </div>
          <div className="flex flex-col gap-2 text-slate-800">
            <h1 className="text-xl flex items-center font-bold gap-2">
              <CiLocationOn className="text-2xl " />
              Location :{" "}
            </h1>
            <div className="flex flex-col text-slate-700 px-5">
              <p className="font-semibold ">OIF cosmetics.</p>
              <p className=" font-semibold ">123 Beauty Lane, Suite 456</p>
              <p className=" font-semibold ">NewYork,</p>
              <p className=" font-semibold ">US,</p>
              <p className=" font-semibold ">Zip : 578292</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-[40vh] md:h-[60vh] mt-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.0505383674!2d-74.30915841691113!3d40.697193362054165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1737818190550!5m2!1sen!2sin"
        //   width="600"
        //   height="450"
        className="w-full h-[40vh] md:h-[60vh]"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
