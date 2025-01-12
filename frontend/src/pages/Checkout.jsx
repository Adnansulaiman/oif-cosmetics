import React, { useState, useEffect } from "react";
import ProfileInput from "../components/ProfileInput";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import CartItem from "../components/CartItem";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";

const Checkout = () => {
  const { userData } = useAuth();
  console.log("user data : ", userData);

  const {
    values: formData,
    handleChange,
    resetForm,
    setValues,
  } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    state: "",
    city: "",
    country: "",
    zip: "",
  });
  // Update form values when userData changes
  useEffect(() => {
    if (userData) {
      setValues({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        street: userData.address?.[0]?.street || "",
        state: userData.address?.[0]?.state || "",
        city: userData.address?.[0]?.city || "",
        country: userData.address?.[0]?.country || "",
        zip: userData.address?.[0]?.zip || "",
      });
    }
  }, [userData, setValues]);
  console.log("formData:", formData);
  const [checkoutStatus, setCheckoutStatus] = useState("address");
  const [paymentMethod, setPaymentMethod] = useState("online");
  return (
    <div className="pt-28 px-16">
      <div className=""></div>
      <form action="">
        {checkoutStatus === "address" && (
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-center">Address Details</h1>
            <div className="flex gap-20 mt-10 ">
              <div className=" gap-3 flex w-full flex-col">
                <h1 className="text-2xl mb-2  font-semibold">User Details</h1>
                <ProfileInput
                  label="First name"
                  type="text"
                  value={formData?.firstName}
                  name="firstName"
                  onChange={handleChange}
                />
                <ProfileInput
                  label="Last name"
                  type="text"
                  value={formData?.lastName}
                  name="lastName"
                  onChange={handleChange}
                />
                <ProfileInput
                  label="Phone"
                  type="number"
                  value={formData?.phone}
                  name="phone"
                  onChange={handleChange}
                />
                <ProfileInput
                  label="Email"
                  type="email"
                  value={formData?.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className=" gap-3 flex w-full flex-col">
                <h1 className="text-2xl mb-2  font-semibold">
                  Delivery Details
                </h1>
                <ProfileInput
                  label="Street"
                  type="text"
                  name="street"
                  value={formData?.street}
                  onChange={handleChange}
                />
                <ProfileInput
                  label="State"
                  type="text"
                  name="state"
                  value={formData?.state}
                  onChange={handleChange}
                />
                <ProfileInput
                  label="City"
                  type="text"
                  name="city"
                  value={formData?.city}
                  onChange={handleChange}
                />
                <div className="flex gap-5">
                  <ProfileInput
                    label="Country"
                    type="text"
                    name="country"
                    value={formData?.country}
                    onChange={handleChange}
                  />
                  <ProfileInput
                    label="Zip code"
                    type="number"
                    name="zip"
                    value={formData?.zip}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-10">
              <button
                onClick={() => setCheckoutStatus("payment")}
                className="text-xl flex justify-center items-center gap-3 font-semibold bg-black text-white px-16 py-3 rounded-lg"
              >
                Next
                <BsArrowRight className="text-2xl mt-" />
              </button>
            </div>
          </div>
        )}
        {checkoutStatus === "payment" && (
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-center">Payment Method</h1>
            <div className="flex justify-center mt-20 gap-10">
              <button
                onClick={() => setPaymentMethod("online")}
                className={`text-2xl font-semibold border-2 border-black rounded-lg px-20 py-5 ${
                  paymentMethod === "online" &&
                  "ring-2 ring-black ring-offset-2"
                }`}
              >
                Online
              </button>
              <button
                onClick={() => setPaymentMethod("cod")}
                className={`text-2xl font-semibold border-2 border-black rounded-lg px-20 py-5 ${
                  paymentMethod === "cod" && "ring-2 ring-black ring-offset-2"
                }`}
              >
                COD
              </button>
            </div>
            <div className="flex h-80 items-end justify-between mt-10">
              <button
                onClick={() => setCheckoutStatus("address")}
                className="text-xl flex justify-center items-center gap-3 font-semibold bg-transparent text-black border border-black px-16 py-3 rounded-lg"
              >
                <BsArrowLeft className="text-2xl mt-" />
                Previous
              </button>
              <button
                onClick={() => setCheckoutStatus("summery")}
                className="text-xl flex justify-center items-center gap-3 font-semibold bg-black text-white px-16 py-3 rounded-lg"
              >
                Next
                <BsArrowRight className="text-2xl mt-" />
              </button>
            </div>
          </div>
        )}
        {checkoutStatus === "summery" && (
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-center">Order Summery</h1>
            <div className="flex mt-10 items-center flex-col ">
              {/* <CartItem /> */}
              <p>.....</p>

              <div className="flex flex-col w-1/2  ">
                <div className=" flex justify-between border-t border-slate-400 pt-6">
                  <p className="text-lg font-semibold text-slate-500">
                    Subtotal
                  </p>
                  <p className="text-lg font-semibold text-slate-500">$1999</p>
                </div>
                <div className=" flex justify-between border-b border-slate-400 pb-6 ">
                  <p className="text-lg font-semibold text-slate-500">
                    Shipping Fee
                  </p>
                  <p className="text-lg font-semibold text-slate-500">Free</p>
                </div>
                <div className=" flex justify-between pt-4 ">
                  <p className="text-lg font-semibold text-slate-800">Total</p>
                  <p className="text-lg font-bold">$1999</p>
                </div>
              </div>
              <div className="text-center flex items-center mt-10 w-1/2 justify-center">
                <button
                  type="submit"
                  className="bg-black w-full py-4 rounded-md text-xl font-bold text-white"
                >
                  Place Order
                </button>
              </div>
            </div>

            <div className="flex h-8 items-end justify-between mt-10">
              <button
                onClick={() => setCheckoutStatus("payment")}
                className="text-xl flex justify-center items-center gap-3 font-semibold bg-transparent text-black border border-black px-16 py-3 rounded-lg"
              >
                <BsArrowLeft className="text-2xl " />
                Previous
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Checkout;
