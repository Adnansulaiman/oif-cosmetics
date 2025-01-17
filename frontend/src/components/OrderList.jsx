import React from 'react'
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

const OrderList = ({data}) => {
    const formatDateToIST = (dateString) => {
        return moment(dateString)
        .tz('Asia/Kolkata')
        .format('DD MMM YYYY [at] hh:mm:ss A');
      };
  return (
    <Link to={`/orders/${data._id}`}> 
    <div className="flex md:px-5 justify-between text-slate-800  border-t border-slate-400 py-3 hover:bg-gray-100">
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2 justify-center items-center">
              <p className="text-base md:text-xl font-semibold">Order ID : </p>
              <p className="text-sm md:text-lg md:pt-1 font-semibold">#{data?._id}</p>
            </div>
            <div className="flex">
              <p className="text-sm md:text-base font-semibold">{formatDateToIST(data?.createdAt)}</p>
            </div>
            <div className="flex flex-col">
              {data?.order_items?.map((item)=>(
                <div key={item._id} className="flex text-slate-600 justify-between items-center">
                <p className="text-base md:text-lg font-semibold">
                  {item?.productId?.name}
                </p>
                <p className="text-sm md:text-base font-semibold">
                  X {item?.quantity}
                </p>
              </div>
              ))}
              
              
            </div>
          </div>
          <div className="flex gap-2 justify-between flex-col">
            <p
              className={`text-lg md:text-xl font-semibold ${
                data?.order_status === "pending" && "text-blue-500"
              } ${data?.order_status === "shipped" && "text-yellow-500"}
              ${data?.order_status === "delivered" && "text-green-500"}
              ${data?.order_status === "cancelled" && "text-red-500"} `}
            >
              {data?.order_status.charAt(0).toUpperCase() +
                data?.order_status.slice(1)}
            </p>
            <p className="text-base md:text-lg font-semibold">
              ${data?.total_price}
            </p>
          </div>
        </div>
        </Link>
  )
}

export default OrderList