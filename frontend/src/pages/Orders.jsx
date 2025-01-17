import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from 'moment-timezone';



const Orders = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/order/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setOrderData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrderDetails();
  }, []);

  const formatDateToIST = (dateString) => {
    return moment(dateString)
    .tz('Asia/Kolkata')
    .format('DD MMM YYYY [at] hh:mm:ss A');
  };

  return (
    <div className="pt-28 px-16 bg-white w-full rounded-xl">
      <div className="flex flex-col px-8 py-5">
        <h1 className="text-3xl font-bold pb-5 ">My Orders</h1>
        {orderData?.map(data => (
          <div key={data._id} className="flex px-5 justify-between text-slate-800  border-t border-slate-400 py-3">
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 justify-center items-center">
              <p className="text-xl font-semibold">Order ID : </p>
              <p className="text-lg pt-1 font-semibold">#{data?._id}</p>
            </div>
            <div className="flex">
              <p className="font-semibold">{formatDateToIST(data?.createdAt)}</p>
            </div>
            <div className="flex flex-col">
              {data?.order_items?.map((item)=>(
                <div key={item._id} className="flex text-slate-600 justify-between items-center">
                <p className="text-lg font-semibold">
                  {item?.productId?.name}
                </p>
                <p className="text- font-semibold">
                  X {item?.quantity}
                </p>
              </div>
              ))}
              
              
            </div>
          </div>
          <div className="flex gap-2 flex-col">
            <p
              className={`text-xl font-semibold ${
                data?.order_status === "pending" && "text-blue-500"
              } ${data?.order_status === "shipped" && "text-yellow-500"}
              ${data?.order_status === "delivered" && "text-green-500"}
              ${data?.order_status === "cancelled" && "text-red-500"} `}
            >
              {data?.order_status.charAt(0).toUpperCase() +
                data?.order_status.slice(1)}
            </p>
            <p className="text-lg font-semibold">
              ${data?.total_price}
            </p>
          </div>
        </div>
        ))}
        
      </div>
    </div>
  );
};

export default Orders;
