import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import moment from "moment-timezone";
const SingleOrder = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchAOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setOrderData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAOrderDetails();
  }, []);
  const formatDateToIST = (dateString) => {
    return moment(dateString)
      .tz("Asia/Kolkata")
      .format("DD MMM YYYY [at] hh:mm:ss A");
  };
  return (
    <div className="flex items-center flex-col py-28 px-6 md:px-16">
      <div className="flex flex-col w-full md:w-1/2 gap-10">
        <div className="flex justify-center  ">
          <h1 className="text-xl md:text-3xl font-bold">{`OrderID : #${id}`} </h1>
        </div>
        <div className="flex flex-col gap-5 text-slate-800 ">
          <div className="flex flex-col">
          {orderData?.order_items?.map((item) => (
            <Link key={item?._id} to={`/product/${item?.productId?._id}`}>
            <div
              
              className="flex gap-5 border-b border-slate-300 py-3  "
            >
              <img
                src={item?.productId?.images[0]}
                alt={item?.productId?.name}
                className="w-28 rounded-lg"
              />
              <div className="flex flex-col justify-center ">
                <h1 className="text-lg md:text-xl font-semibold">
                  {item?.productId?.name}
                </h1>
                <p className="text-base font-medium text-slate-600">
                  {item?.productId?.brand}
                </p>
                <p className="text- font-medium text-slate-600">
                  ${item?.productId?.price}
                </p>
                <p className="text- font-medium text-slate-600">
                  Quantity : {item?.quantity}
                </p>
              </div>
            </div>
            </Link>
          ))}
          </div>
          <div className="flex flex-col gap-3 border-b border-slate-300 py-3">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Total Price : </p>
              <div className="flex flex-col items-end">
                <p className="text-xl font-semibold">
                  ${orderData?.total_price}
                </p>
                <p className="text-sm font-medium text-slate-500">
                  (Shipping Fee included)
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Payment Mode : </p>
              <p className="text-xl font-semibold">
                {orderData?.payment_method.toUpperCase()}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Order Placed At : </p>
              <p className="text-lg md:text-xl font-semibold">
                {formatDateToIST(orderData?.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-center text-2xl font-bold">Delivery Address</h1>
            <div className="flex flex-col gap-1 text-slate-600">
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Name : </p>
                <p className="text-lg font-semibold">
                  {orderData?.shipping_address?.firstName +
                    " " +
                    orderData?.shipping_address?.lastName}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Email : </p>
                <p className="text-lg font-semibold">
                  {orderData?.shipping_address?.email}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Phone : </p>
                <p className="text-lg font-semibold">
                  {orderData?.shipping_address?.phone}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Street : </p>
                <p className="text-lg font-semibold">
                  {orderData?.shipping_address?.street}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">State : </p>
                <p className="text-lg font-semibold">
                  {orderData?.shipping_address?.state}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">City : </p>
                <p className="text-lg font-semibold">
                  {orderData?.shipping_address?.city}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Country : </p>
                <p className="text-lg font-semibold">
                  {orderData?.shipping_address?.country}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Zip code : </p>
                <p className="text-lg font-semibold">
                  {orderData?.shipping_address?.zip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
