import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import ProfileInput from "./ProfileInput";

const UserProfile = () => {
  const [gender, setGender] = useState("Male");
  const [accountOpen, setAccountOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col w-2/5 bg-white rounded-xl">
        <div className="flex justify-between items-center mb-3 pt-6 pb-3 px-10 border-b border-slate-300">
          <h1 className="text-xl font-bold">Account Details</h1>
          <BiEdit
            className="text-2xl cursor-pointer"
            onClick={() => setAccountOpen(true)}
          />
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">First Name </p>
          <p className="text-base">Adnan</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Last Name </p>
          <p className="text-base">Sulaiman</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Date of Birth </p>
          <p className="text-base">12 June,2004</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Gender</p>
          <p className="text-base">Male</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Phone</p>
          <p className="text-base">46787676748</p>
        </div>
      </div>
      <div className="flex flex-col  w-2/5 bg-white rounded-xl">
        <div className="flex justify-between items-center mb-3 pt-6 pb-3 px-10 border-b border-slate-300">
          <h1 className="text-xl font-bold">Shipping Address</h1>
          <BiEdit
            className="text-2xl cursor-pointer"
            onClick={() => setShippingOpen(true)}
          />
        </div>{" "}
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Street </p>
          <p className="text-base">123 Main Street</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">City </p>
          <p className="text-base">New York</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">State</p>
          <p className="text-base">NY</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Country</p>
          <p className="text-base">USA</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Zip code</p>
          <p className="text-base">10001</p>
        </div>
      </div>
      {accountOpen ||
        (shippingOpen && (
          <div className="absolute top-0 left-0 w-screen h-screen bg-gray backdrop-blur-md z-20"></div>
        ))}

      {accountOpen && (
        <div className="absolute shadow-lg z-50 top-28 left-96 flex flex-col gap-10  bg-white w-1/2 rounded-2xl ">
          <div className="flex justify-between border-b border-slate-400 items-center pt-5 pb-3 px-10">
            <h1 className="text-2xl font-bold  ">Account Details</h1>
            <IoIosClose
              className="text-4xl cursor-pointer"
              onClick={() => setAccountOpen(false)}
            />
          </div>
          <div className="flex flex-col gap-5 px-10">
            <div className="flex gap-5">
              <ProfileInput type="text" label="First name" name="firstName" />
              <ProfileInput type="text" label="Last name" name="lastName" />
            </div>
            <div className="flex gap-5">
              <ProfileInput type="date" label="Date of Birth" name="dob" />
              <ProfileInput type="number" label="Phone" name="phone" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base font-semibold">
                Gender
              </label>
              <div className="flex gap-5">
                <p
                  onClick={() => setGender("Male")}
                  className={`cursor-pointer text-base font-medium text-center border border-black w-full p-2 rounded-lg ${
                    gender === "Male" && "ring-1 ring-black ring-offset-2"
                  }`}
                >
                  Male
                </p>
                <p
                  onClick={() => setGender("Female")}
                  className={`cursor-pointer text-base font-medium text-center border border-black w-full p-2 rounded-lg ${
                    gender === "Female" && "ring-1 ring-black ring-offset-2"
                  }`}
                >
                  Female
                </p>
                <p
                  onClick={() => setGender("Trans")}
                  className={`cursor-pointer text-base font-medium text-center border border-black w-full p-2 rounded-lg ${
                    gender === "Trans" && "ring-1 ring-black ring-offset-2"
                  }`}
                >
                  Trans
                </p>
              </div>
            </div>
            <div className="flex gap-40 mt-10">
              <button
                onClick={() => setAccountOpen(false)}
                className="w-full mb-10 border border-black p-3 rounded-lg text-base font-semibold"
              >
                Cancel
              </button>
              <button className="w-full border mb-10 border-black bg-black text-white p-3 rounded-lg text-base font-semibold">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {shippingOpen && (
        <div className="absolute shadow-lg z-50 top-28 left-96 flex flex-col gap-10  bg-white w-1/2 rounded-2xl ">
          <div className="flex justify-between border-b border-slate-400 items-center pt-5 pb-3 px-10">
            <h1 className="text-2xl font-bold  ">Shipping Address</h1>
            <IoIosClose
              className="text-4xl cursor-pointer"
              onClick={() => setShippingOpen(false)}
            />
          </div>
          <div className="flex flex-col gap-5 px-10">
            <ProfileInput type="text" label="Street" name="street" />
            <div className="flex gap-5">
              <ProfileInput type="text" label="City" name="city" />
              <ProfileInput type="text" label="State" name="state" />
            </div>
            <div className="flex gap-5">
              <ProfileInput type="text" label="Country" name="country" />
              <ProfileInput type="number" label="Zip code" name="zip" />
            </div>

            <div className="flex gap-40 mt-10">
              <button
                onClick={() => setShippingOpen(false)}
                className="w-full mb-10 border border-black p-3 rounded-lg text-base font-semibold"
              >
                Cancel
              </button>
              <button className="w-full border mb-10 border-black bg-black text-white p-3 rounded-lg text-base font-semibold">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
