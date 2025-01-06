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

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="bg-secondary">
      <Navbar cartOpen={cartOpen} setCartOpen={setCartOpen} />

      {cartOpen && (
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-40"
        onClick={() => setCartOpen(false)} // Close cart on overlay click
      ></div>
    )}
      {cartOpen && <Cart setCartOpen={setCartOpen} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:prodId" element={<SingleProduct />} />
      </Routes>
    </div>
  );
}

export default App;
