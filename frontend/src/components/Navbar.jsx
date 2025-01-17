// import Logo from '../../assets/images/oif.green.png';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch, IoIosInformationCircleOutline } from "react-icons/io";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { GoHome } from "react-icons/go";
import { CiShoppingTag } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { MdOutlineArticle } from "react-icons/md";

import { CiLogin, CiLogout, CiSettings } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import Cart from "./Cart";
import { useUserInfo } from "../context/userContext";
import WarningPopup from "./WarningPopup";

const Navbar = () => {
  const {cartData} = useUserInfo()
  const [cartOpen, setCartOpen] = useState(false);
  const [warningOpen,setWarningOpen] = useState(false);

  const { logout, loggedIn, getUserData,userData } = useAuth();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

//   const token = localStorage.getItem('token')
//  const userData = getUserData(token)
    console.log(userData)
  const profileRef = useRef();
  useEffect(() => {
    const handleClickCloseProfile = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickCloseProfile);
    return () => {
      document.removeEventListener("mousedown", handleClickCloseProfile);
    };
  }, [setProfileOpen]);

  const menuRef = useRef();
  useEffect(() => {
    const handleClickCloseMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickCloseMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickCloseMenu);
    };
  }, [setOpenMenu]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Navbar Desktop */}
      <div
        className=" hidden md:flex fixed z-50 text-black bg-gray-400 mt-4 mx-0 px-4 rounded-xl 
    justify-between items-center w-[calc(100%-6rem)] left-12 h-16 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20"
      >
        <ul className="flex gap-8  items-center ">
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? { fontWeight: "bold" } : null)}
          >
            <li className="hover:scale-110">Home</li>
          </NavLink>
          <NavLink
            to="/shop"
            style={({ isActive }) => (isActive ? { fontWeight: "bold" } : null)}
          >
            <li className="hover:scale-110">Shop</li>
          </NavLink>
          <NavLink
            to="/about"
            style={({ isActive }) => (isActive ? { fontWeight: "bold" } : null)}
          >
            <li className="hover:scale-110">About Us</li>
          </NavLink>
          <NavLink
            to="/contact"
            style={({ isActive }) => (isActive ? { fontWeight: "bold" } : null)}
          >
            <li className="hover:scale-110">Contact</li>
          </NavLink>
          <NavLink
            to="/blog"
            style={({ isActive }) => (isActive ? { fontWeight: "bold" } : null)}
          >
            <li className="hover:scale-110">Blog</li>
          </NavLink>
        </ul>
        <p className="text-3xl font-black pr-52">OIF.</p>
        <div className="flex  gap-16 items-center">
          {loggedIn && (
            <Link
              onClick={() => {
                setCartOpen(true);
              }}
            >
              <p className="hover:scale-110">{`Cart(${cartData?.cartItems?.length})`}</p>
            </Link>
          )}
          {!loggedIn && (
            <Link to="/login">
              <p className="border bg-black text-white font-semibold border-black px-8 py-2 rounded-md">Login</p>
            </Link>
          )}
          <div className="flex gap-2 items-center ">
            <p>{userData ? userData?.firstName + " " + userData?.lastName : ""}</p>
            <Link onClick={() => setProfileOpen(!profileOpen)}>
              <img
                src={userData?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt=""
                className="w-6 h-6 rounded-full hover:border-2 hover:border-black"
              />
            </Link>
          </div>
        </div>
        {/* {cartOpen && (
      <div
        className="  w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-40"
        onClick={() => setCartOpen(false)} // Close cart on overlay click
      ></div>
    )} */}
      {cartOpen && <Cart setCartOpen={setCartOpen} />}
      {profileOpen  && (
        <div
          ref={profileRef}
          className="absolute rounded-2xl top-14 right-0 flex flex-col w-1/6 h-72 px-4 py-6 justify-between bg-white z-50"
        >
          <div className="flex  border-b pb-3 border-opacity-30 border-black flex-col gap-2  items-center ">
            <Link to="/profile">
              <img
                src={userData?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt=""
                className="w-6 h-6 rounded-full hover:border-2 hover:border-black"
              />
            </Link>
            <p>{userData ? userData?.firstName + " " + userData?.lastName : "Profile"}</p>

          </div>
          <ul className="flex flex-col px-4">
            <Link to='/wishlist'
             onClick={() => setProfileOpen(false)}>
              <li>Wishlist</li>
            </Link>
            <Link to='/orders'
             onClick={() => setProfileOpen(false)}>
              <li>Orders</li>
            </Link>
          </ul>
          <div className="flex px-4 flex-col pt-3 border-t border-black border-opacity-40">
            {/* <Link>
              <p className="flex  items-center">
                Settings <CiSettings className="text-lg mt-1 " />
              </p>
            </Link> */}
            {loggedIn && (
              <Link
                onClick={() => {
                 setWarningOpen(true) , setProfileOpen(false);
                }}
              >
                <p className="flex items-center text-red-500">
                  Logout
                  <CiLogin className="text-lg mt-1" />
                </p>
              </Link>
            )}
          </div>
        </div>
      )}
      </div>
      {/* Navbar Mobile */}
      <div className="flex  justify-between w-[calc(100%-1rem)] items-center md:hidden my-3 px-5 fixed z-50 py-3 mx-2 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20">
        <Link to='/'><h1 className="text-2xl font-black">OIF.</h1></Link>
        <div className="flex gap-4 items-center">
          <Link>
            <IoIosSearch className="text-2xl " />
          </Link>
          {loggedIn && (
            <Link className="relative">
              <LiaShoppingBagSolid
                onClick={() => {
                  setCartOpen(true);
                }}
                className="text-2xl"
              />
              <span className="bg-black w-3 h-3 text-white flex justify-center items-center -top-0 -right-1 rounded-full absolute text-[10px]">{cartData?.cartItems?.length}</span>
            </Link>
          )}
          {/* {!loggedIn && (
            <Link to="/login">
              <CiLogin className="text-2xl cursor-pointer" />
            </Link>
          )} */}
          {!loggedIn && (
            <Link to="/login">
              <p className="border bg-black text-white font-semibold border-black px-8 py-2 rounded-md">Login</p>
            </Link>
          )}
          <IoMenu
            className="text-3xl cursor-pointer"
            onClick={() => setOpenMenu(true)}
          />
          
        </div>
        {cartOpen && <Cart setCartOpen={setCartOpen} />}
      
      {openMenu && (
        <div
          ref={menuRef}
          className="gap-3  ease-in-out  sm:hidden justify-between absolute p-3 w-1/3 rounded-s-2xl h-screen z-50 -top-3 right-0 bg-white flex flex-col"
        >
          <div className="flex flex-col gap-4">
            <div className="flex border-b pb-1 border-opacity-30 border-black justify-end">
              <IoCloseOutline
                className="text-3xl cursor-pointer "
                onClick={() => {
                  setOpenMenu(false);
                }}
              />
            </div>
            {loggedIn && (
            <div className="flex border-b pb-1 border-opacity-30 border-black flex-col  items-center ">
              
                <Link to="/profile"
                onClick={()=> setOpenMenu(false)}>
                <img
                src={userData?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt=""
                  className="w-6 h-6 rounded-full hover:border-2 hover:border-black"
                />
              </Link>
              
              <p>{userData ? userData?.firstName + " " + userData?.lastName : "Profile"}</p>

            </div>
            )}
            <ul className="flex px-4 py-2 flex-col  gap-2">
              <NavLink
                to="/"
                onClick={() => setOpenMenu(false)}
                style={({ isActive }) =>
                  isActive ? { fontWeight: "bold" } : null
                }
              >
                <li className="hover:scale-110 flex items-center gap-1">
                  <GoHome className="text-lg" />
                  Home
                </li>
              </NavLink>
              <NavLink
                to="/shop"
                onClick={() => setOpenMenu(false)}
                style={({ isActive }) =>
                  isActive ? { fontWeight: "bold" } : null
                }
              >
                <li className="hover:scale-110 flex items-center gap-1">
                  <CiShoppingTag className="text-xl" />
                  Shop
                </li>
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setOpenMenu(false)}
                style={({ isActive }) =>
                  isActive ? { fontWeight: "bold" } : null
                }
              >
                <li className="hover:scale-110 flex items-center gap-1">
                  <IoIosInformationCircleOutline className="text-lg" />
                  About
                </li>
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setOpenMenu(false)}
                style={({ isActive }) =>
                  isActive ? { fontWeight: "bold" } : null
                }
              >
                <li className="hover:scale-110 flex items-center gap-1">
                  <BiSupport className="text-lg" />
                  Contact
                </li>
              </NavLink>
              <NavLink
                to="/blog"
                onClick={() => setOpenMenu(false)}
                style={({ isActive }) =>
                  isActive ? { fontWeight: "bold" } : null
                }
              >
                <li className="hover:scale-110 flex items-center gap-1">
                  <MdOutlineArticle className="text-lg" />
                  Blog
                </li>
              </NavLink>
            </ul>
            <ul className="flex flex-col px-4 border-t border-black border-opacity-40 pt-3">
            <Link to='/wishlist'
             onClick={() => setOpenMenu(false)}>
              <li>Wishlist</li>
            </Link>
            <Link to='/orders'
             onClick={() => setOpenMenu(false)}>
              <li>Orders</li>
            </Link>
          </ul>
          </div>

          

          <div className="flex pb-5 pt-3 gap-2 px-4 flex-col border-t border-black border-opacity-40">
            {/* <Link>
              <p className="flex  items-center">
                Settings <CiSettings className="text-lg mt-1 " />
              </p>
            </Link> */}
            {loggedIn && (
              <Link
                onClick={() => {
                  setWarningOpen(true), setOpenMenu(false);
                }}
              >
                <p className="flex items-center gap-1 text-red-500">
                  Logout
                  <CiLogin className="text-lg mt-1" />
                </p>
              </Link>
            )}
          </div>
        </div>
      )}
      
      </div>
      

      {openMenu && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm z-40"
          onClick={() => setCartOpen(false)} // Close cart on overlay click
        ></div>
      )}
      {warningOpen && (
        <div className="flex justify-center items-center w-full h-screen">
        <WarningPopup text="Are you really want to logout?" button='Logout' setWarningOpen={setWarningOpen} handleAction={handleLogout} />
        </div>
      )}
    </>
  );
};

export default Navbar;
