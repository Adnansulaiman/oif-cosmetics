// import React, { useState } from 'react';
// import axios from 'axios';

// const PaymentForm = () => {
//   const [items, setItems] = useState([
//     { name: 'Product 1', price: 500, quantity: 1 },
//     { name: 'Product 2', price: 300, quantity: 2 },
//   ]);

//   const handlePayment = async () => {
//     try {
//         const token = localStorage.getItem('token')
//       const response = await axios.post('http://localhost:3000/api/order/payment', { items }
//         ,{
//             headers:{
//                 Authorization: `Bearer ${token}`
//             }
//         }
//       );
//       window.location.href = response.data.url; // Redirect to Stripe checkout
//     } catch (error) {
//       console.error('Error during payment:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Checkout</h2>
//       <button onClick={handlePayment}>Pay Now</button>
//     </div>
//   );
// };

// export default PaymentForm;
