import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Hero from './component/Hero/Hero
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";
import { useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SingleProduct from "./pages/SingleProduct";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import UserProfile from "./components/UserProfile";
import Security from "./components/Security";
import Orders from "./pages/Orders";
// import Chekout from "./pages/Chekout";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
// import StripeContainer from "./components/StripeContainer";
import SingleOrder from "./pages/SingleOrder";
import ForgetPassword from "./pages/ForgetPassword";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderSuccess from "./components/OrderSuccess";
// import PaymentForm from "./components/PaymentForm";

function App() {
  return (
    <div className="bg-secondary">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<SingleOrder />} />
        <Route path="/product/:prodId" element={<SingleProduct />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="/profile/" element={<UserProfile />} />
          <Route path="/profile/security" element={<Security />} />
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<OrderSuccess />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        {/* <Route path="/payment" element={<PaymentForm />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
