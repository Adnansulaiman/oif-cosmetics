import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderList from "../components/OrderList";



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

 

  return (
    <div className="pt-28 px-16 bg-white w-full rounded-xl">
      <div className="flex flex-col px-8 py-5">
        <h1 className="text-3xl font-bold pb-5 ">My Orders</h1>
        {orderData?.map(data => (
          <OrderList key={data._id} data={data} />
        ))}
        
      </div>
    </div>
  );
};

export default Orders;
