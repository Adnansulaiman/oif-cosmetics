import React from 'react'
import SuccessImage from "../assets/images/check.png";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="absolute flex justify-center items-center bg-green-500 top-0 left-0 w-full h-[111vh] z-40 ">
          <div className=" flex flex-col justify-center rounded-2xl items-center shadow-slate-600 py-10 shadow-sm bg-white w-full mx-10 md:w-2/5">
            <img
              src={SuccessImage}
              className="w-16 md:w-24"
              alt="success image"
            />
            <h1 className="text-3xl md:text-4xl text-slate-900 font-medium mt-4">
              Wooohoo!
            </h1>
            <p className="text-xl text-slate-600 font-medium">
              Your order has been placed
            </p>
            <Link to="/shop">
              <button className="text-xl bg-slate-950 text-white px-10 py-4 font-medium rounded-lg mt-8">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
  )
}

export default OrderSuccess