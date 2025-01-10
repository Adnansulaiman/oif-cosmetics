import React from "react";
import ProfileImage from "../assets/images/profile-1.jpeg";
// import { BsUpload } from "react-icons/bs";
// import { MdDeleteOutline } from "react-icons/md";
// import { CiMail,CiPhone } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const {userData} = useAuth()
  return (
    <div className="pt-24 px-12 flex flex-col h-screen">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="flex mt-8 gap-4">
        <div className="flex w-1/5 bg-white rounded-xl flex-col">
          <div className=" relative border-b border-slate-300 flex flex-col justify-center items-center ">
            <img
              src={ProfileImage}
              alt=""
              className=" rounded-full shadow-md w-48 mt-6   "
            />
            <FiPlus className="absolute bottom-20 right-16 ring-4 ring-white  border border-black bg-white text-4xl p-2 rounded-full" />
            <h1 className="text-2xl font-bold mt-3">{userData?.firstName + " " + userData?.lastName}</h1>
            <p className="text-sm font-medium text-slate-600 mb-3">
              {userData?.email}
            </p>
          </div>
          <div className="flex flex-col gap-3 px-10 py-5 ">
            <Link to='/profile'>
            <p className="text-base font-semibold">User Profile</p>
            </Link>
            <Link to='/profile/security'>
            <p className="text-base font-semibold">Security</p>
            </Link>
            <Link to='/profile/orders'>
            <p className="text-base font-semibold">Orders</p>
            </Link>
            <Link to='/profile/wishlist'>
            <p className="text-base font-semibold border-b border-slate-300 pb-3">
              Wishlist
            </p>
            </Link>
            <p className="text-base font-semibold text-red-500">Logout</p>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
