import React, { useState, useEffect } from "react";
import ProfileInput from "../components/ProfileInput";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import CartItem from "../components/CartItem";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import { useUserInfo } from "../context/userContext";
import axios from "axios";

import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
// import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51QgVb5BUv5zQzyPf1PnfvFnkqe6LRYo3pLcuOZPagpkqmun7ApgRVKZJ774jXoP0TYA8d8gMiLu3YMQ1L9YTTh9t00rcfPAbDO");


const Checkout = () => {
  const navigate = useNavigate();
  
  // const stripe = useStripe();
  // const elements = useElements();
  

  const { userData } = useAuth();
  console.log("user data : ", userData);
  const { cartData,clearCart } = useUserInfo();
  console.log(cartData);
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
  // const [successOrder, setSuccessOrder] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState("address");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    if (cartData?.totalPrice !== undefined) {
      setShippingPrice(cartData.totalPrice > 100 ? 0 : 10);
    }
  }, [cartData?.totalPrice]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submit successfully")
    if(paymentMethod === 'online'){
      await handleCheckout();
      return;
    }
    try {
      await placeOrder();
    } catch (err) {
      console.log(err);
    }
  };

  // On the payment success or failure page
const checkPaymentStatus = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  
  if (sessionId) {
    try {
      const token = localStorage.getItem('token')
      // Call your backend to verify the payment status using sessionId
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/verify-payment/${sessionId}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });

      const { paymentStatus } = response.data;
      console.log(paymentStatus);
      if (paymentStatus === 'paid') {
        // Payment was successful, now place the order in your database
        placeOrder();
      } else {
        // Payment failed, show an error message
        alert('Payment failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  }
};

checkPaymentStatus();

  const placeOrder = async() =>{
    const token = localStorage.getItem("token");
      const orderItems = cartData.cartItems.map((item) => ({
        productId: item.productId._id, // Get the product ID
        quantity: item.quantity, // Get the quantity
      }));
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/`,
        {
          user_id: userData?._id,
          order_items: orderItems,
          shipping_address: {
            firstName:formData?.firstName,
            lastName:formData?.lastName,
            phone:formData?.phone,
            email:formData?.email,
            street: formData?.street,
            city: formData?.city,
            country: formData?.country,
            state: formData?.state,
            zip: formData?.zip,
          },
          total_price: cartData?.totalPrice + shippingPrice,
          payment_method: paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order placed successfully",response.data);
      if (response.data) {
        // setSuccessOrder(true);
        clearCart();
        navigate('/checkout/success');
      }
      resetForm();
  }
  const handleCheckout =async ()=>{
    try {
      if(paymentMethod === 'online'){
      const token = localStorage.getItem('token');
      const orderItems = cartData.cartItems.map(item => ({
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity,
      }));
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/payment`,
        { products: orderItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Stripe session response:', response.data); // Log the response
      const {id} = response.data;

      //load stripe and redirect to checkout
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: id });
    }
    } catch (error) {
      console.error(error);
    }
}


  return (
    <>
      <div className="pt-20 px-6 md:pt-28 md:px-16">
        <div className=""></div>
        <form onSubmit={handleOrderSubmit}>
          {checkoutStatus === "address" && (
            <div className="flex flex-col ">
              <h1 className="text-4xl font-bold text-center">
                Address Details
              </h1>
              <div className="flex  flex-col md:flex-row gap-10 md:gap-10 mt-10 ">
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
                  <div className="flex flex-col md:flex-row gap-5">
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
              <div className="flex justify-end mt-10 mb-10">
                <button
                  onClick={() => setCheckoutStatus("payment")}
                  className="text-xl flex justify-center items-center gap-3 font-semibold bg-black text-white px-8  md:px-16 py-3 rounded-lg"
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
              <div className="flex  text-center justify-center mt-20 gap-5 md:gap-10">
                <div
                  onClick={() => setPaymentMethod("online")}
                  className={`cursor-pointer text-2xl font-semibold border-2 border-black rounded-lg px-10 md:px-20 py-5 ${
                    paymentMethod === "online" &&
                    "ring-2 ring-black ring-offset-2"
                  }`}
                >
                  Online
                </div>
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`cursor-pointer text-2xl font-semibold border-2 border-black rounded-lg px-10 md:px-20 py-5 ${
                    paymentMethod === "cod" && "ring-2 ring-black ring-offset-2"
                  }`}
                >
                  COD
                </div>
              </div>
              <div className="flex h-32 md:h-80 items-end justify-between mt-10">
                <button
                  onClick={() => setCheckoutStatus("address")}
                  className="text-xl flex justify-center items-center gap-3 font-semibold bg-transparent text-black border border-black px-8 md:px-16 py-3 rounded-lg"
                >
                  <BsArrowLeft className="text-2xl mt-" />
                  Back
                </button>
                <button
                  onClick={() => setCheckoutStatus("summery")}
                  className="text-xl flex justify-center items-center gap-3 font-semibold bg-black text-white px-8 md:px-16 py-3 rounded-lg"
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
              <div className="flex mt-3 items-center flex-col ">
                <div className="flex flex-col w-full md:w-1/2 h-[42vh] overflow-y-auto no-scrollbar ">
                  {cartData?.cartItems?.length > 0 &&
                    cartData?.cartItems?.map((item) => (
                      <CartItem key={item.productId._id} item={item} />
                    ))}
                </div>

                <div className="flex flex-col w-full  md:w-1/2  ">
                  <div className=" flex justify-between border-t border-slate-400 pt-6">
                    <p className="text-lg font-semibold text-slate-500">
                      Subtotal
                    </p>
                    <p className="text-lg font-semibold text-slate-500">
                      ${cartData?.totalPrice}
                    </p>
                  </div>
                  <div className=" flex justify-between border-b border-slate-400 pb-6 ">
                    <p className="text-lg font-semibold text-slate-500">
                      Shipping Fee
                    </p>
                    <p className="text-lg font-semibold text-slate-500">
                      {shippingPrice === 0 ? "Free" : `$${shippingPrice}`}
                    </p>
                  </div>
                  <div className=" flex justify-between pt-4 ">
                    <p className="text-lg font-semibold text-slate-800">
                      Total
                    </p>
                    <p className="text-lg font-bold">
                      ${cartData?.totalPrice + shippingPrice || 0}
                    </p>
                  </div>
                </div>
                {/* {paymentMethod === "online" && (
                  <Elements stripe={stripePromise}>
                    <CardElement className="border p-4" />
                  </Elements>
                )} */}
                <div className="text-center flex items-center mt-5 w-full md:w-1/2 justify-center">
                  <button
                    type="submit"
                    className="bg-black w-full py-4 rounded-md text-xl font-bold text-white"
                  >
                    Place Order
                  </button>
                </div>
              </div>

              <div className="flex h-8 items-end justify-between mt-20">
                <button
                  onClick={() => setCheckoutStatus("payment")}
                  className="text-xl flex justify-center items-center gap-3 font-semibold bg-transparent text-black border border-black px-8 md:px-16 py-3 rounded-lg"
                >
                  <BsArrowLeft className="text-2xl " />
                  Back
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      {/* {paymentOpen && paymentMethod === "online" && (
        <div className=" flex justify-center items-center absolute top-0 left-0 w-full h-screen bg-gray-100 backdrop:blur-md">
        <div className="flex flex-col w-1/2">
          <div className="mt-10">
            <CardElement className="border p-4 rounded" />
          </div>
          <div className="flex justify-end mt-10">
            <button
              type="button"
              onClick={handlePayment}
              className="text-xl font-semibold bg-black text-white px-16 py-3 rounded-lg"
            >
              Pay Now
            </button>
          </div>
        </div>
        </div>
      )} */}
     
    </>
  );
};

export default Checkout;
