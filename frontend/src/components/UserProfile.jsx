import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import ProfileInput from "./ProfileInput";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";
import axios from "axios";

const UserProfile = () => {
  const { userData, setUserData } = useAuth();
  console.log("user data : ", userData);
  const [gender, setGender] = useState("Male");
  const [accountOpen, setAccountOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const openAddAddressPopup = () => {
    setShippingOpen(true);
    setIsEditing(false);
    resetAddressForm(); // Clear the form for a new address
  };

  const openEditAddressPopup = (address) => {
    setShippingOpen(true);
    setIsEditing(true);
    setEditingAddressId(address._id); // Track the ID of the address being edited
    setAddressValues({
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      zip: address.zip,
    });
  };

  //   const accountInitialValue = {
  //     firstName: userData?.firstName,
  //     lastName: userData?.lastName,
  //     phone: userData?.phone || "",
  //     dob: userData?.dob || "",
  //     gender: userData?.gender || "Male",
  //   };
  //   console.log(accountInitialValue)
  const {
    values: accountData,
    handleChange: handleAccountChange,
    resetForm: resetAccountForm,
    setValues: setAccountValues, // Add this to manually set form values
  } = useForm({
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    gender: "Male",
  });

  // Update form values when accountOpen changes
  useEffect(() => {
    if (accountOpen && userData) {
      setAccountValues({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        dob: userData.dob || "",
        gender: userData.gender || "Male",
      });
      setGender(userData.gender || "Male");
    }
  }, [accountOpen, userData]);

  const isAccountValidButton =
    !accountData?.firstName ||
    !accountData?.lastName ||
    !accountData?.dob ||
    !accountData?.phone;
  
  //   console.log("value : ",isAccountValidButton)
  //   console.log("Account Data : ", accountData);

  const addressInitialValue = {
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  };
  const {
    values: addressData,
    handleChange: handleAddressChange,
    resetForm: resetAddressForm,
    setValues: setAddressValues,
  } = useForm(addressInitialValue);

  
  console.log("Account Data : ", accountData);
  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    // console.log(accountData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/user/`,
        {
          firstName: accountData?.firstName,
          lastName: accountData?.lastName,
          dob: accountData?.dob,
          phone: accountData?.phone,
          gender: gender,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log(response.data.user);
      setUserData(response.data.user);
      resetAccountForm();
      // setCartData(response.data.cart);
    } catch (err) {
      console.error("Error Decrement cart quantity :", err);
    } finally {
      setTimeout(() => {
        setAccountOpen(false);
      }, 1000);
    }
  };
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    try {
      if (isEditing) {
        // Update Address
        const response = await axios.put(
          `http://localhost:3000/api/user/update-address/${editingAddressId}`,
          addressData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserData(response.data.user); // Update user data
      } else {
        // Add New Address
        const response = await axios.post(
          `http://localhost:3000/api/user/add-address`,
          addressData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUserData(response.data.user); // Update user data
      }
      resetAddressForm(); // Clear form
      setShippingOpen(false);
    } catch (err) {
      console.error("Error managing address:", err);
    }
  };
  const isAddressValidButton =
    !addressData?.state ||
    !addressData?.street ||
    !addressData?.city ||
    !addressData?.zip ||
    !addressData?.country;


  return (
    <>
      <div className="flex flex-col w-2/5 bg-white rounded-xl">
        <div className="flex justify-between items-center mb-3 pt-6 pb-3 px-10 border-b border-slate-300">
          <h1 className="text-xl font-bold">Account Details</h1>
          <BiEdit
            className="text-2xl cursor-pointer"
            onClick={() => setAccountOpen(true)}
          />
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">First Name </p>
          <p className="text-base">{userData?.firstName}</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Last Name </p>
          <p className="text-base">{userData?.lastName}</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Date of Birth </p>
          <p className="text-base">{userData?.dob || "--:--:--"}</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Gender</p>
          <p className="text-base">{userData?.gender || "----"}</p>
        </div>
        <div className="flex mt-4 text-slate-600 font-semibold justify-between px-10 items-center">
          <p className="text-base">Phone</p>
          <p className="text-base">{userData?.phone || "----"}</p>
        </div>
      </div>
      <div className="flex flex-col  w-2/5 bg-white rounded-xl">
        <div className="flex justify-between items-center mb-3 pt-6 pb-3 px-10 border-b border-slate-300">
          <h1 className="text-xl font-bold">Shipping Address</h1>
          <div className="flex gap-3">
            <CiCirclePlus
              className="text-2xl cursor-pointer"
              onClick={openAddAddressPopup}
            />
            {/* <BiEdit
            className="text-2xl cursor-pointer"
            onClick={() => setShippingOpen(true)}
          /> */}
          </div>
        </div>{" "}
        {userData?.address?.length ? (
          userData?.address?.map((addr) => (
            <div key={addr._id} className="flex flex-col">
              <div className="flex justify-end px-10 mt-3">
                <BiEdit
                  className="text-xl cursor-pointer"
                  onClick={() => openEditAddressPopup(addr)}
                />
              </div>
              <div className="flex flex-col border-b mx-10 pb-4 gap-4 pt-4 border-slate-500">
                <div className="flex  text-slate-600 font-semibold  justify-between  items-center">
                  <p className="text-base">Street </p>
                  <p className="text-base">{addr?.street}</p>
                </div>
                <div className="flex  text-slate-600 font-semibold justify-between  items-center">
                  <p className="text-base">City </p>
                  <p className="text-base">{addr?.city}</p>
                </div>
                <div className="flex  text-slate-600 font-semibold justify-between  items-center">
                  <p className="text-base">State</p>
                  <p className="text-base">{addr?.state}</p>
                </div>
                <div className="flex  text-slate-600 font-semibold justify-between  items-center">
                  <p className="text-base">Country</p>
                  <p className="text-base">{addr?.country}</p>
                </div>
                <div className="flex  text-slate-600 font-semibold justify-between  items-center">
                  <p className="text-base">Zip code</p>
                  <p className="text-base">{addr?.zip}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center mt-5">
            <p className="text-lg font-semibold text-slate-500">
              Address is empty.
            </p>
          </div>
        )}
      </div>
      {accountOpen ||
        (shippingOpen && (
          <div className="absolute top-0 left-0 w-screen h-screen bg-gray backdrop-blur-md z-20"></div>
        ))}

      {accountOpen && (
        <div className="absolute shadow-lg z-50 top-28 left-96 flex flex-col gap-10  bg-white w-1/2 rounded-2xl ">
          <div className="flex justify-between border-b border-slate-400 items-center pt-5 pb-3 px-10">
            <h1 className="text-2xl font-bold  ">Account Details</h1>
            <IoIosClose
              className="text-4xl cursor-pointer"
              onClick={() => setAccountOpen(false)}
            />
          </div>
          <form onSubmit={handleAccountSubmit}>
            <div className="flex flex-col gap-5 px-10">
              <div className="flex gap-5">
                <ProfileInput
                  type="text"
                  label="First name"
                  name="firstName"
                  value={userData?.firstName}
                  onChange={handleAccountChange}
                />
                <ProfileInput
                  type="text"
                  label="Last name"
                  name="lastName"
                  value={accountData?.lastName}
                  onChange={handleAccountChange}
                />
              </div>
              <div className="flex gap-5">
                <ProfileInput
                  type="date"
                  label="Date of Birth"
                  name="dob"
                  value={accountData?.dob}
                  onChange={handleAccountChange}
                />
                <ProfileInput
                  type="number"
                  label="Phone"
                  name="phone"
                  value={accountData?.phone}
                  onChange={handleAccountChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-base font-semibold">
                  Gender
                </label>
                <div className="flex gap-5">
                  <p
                    onClick={() => setGender("Male")}
                    className={`cursor-pointer text-base font-medium text-center border border-black w-full p-2 rounded-lg ${
                      gender === "Male" && "ring-1 ring-black ring-offset-2"
                    }`}
                  >
                    Male
                  </p>
                  <p
                    onClick={() => setGender("Female")}
                    className={`cursor-pointer text-base font-medium text-center border border-black w-full p-2 rounded-lg ${
                      gender === "Female" && "ring-1 ring-black ring-offset-2"
                    }`}
                  >
                    Female
                  </p>
                  <p
                    onClick={() => setGender("Trans")}
                    className={`cursor-pointer text-base font-medium text-center border border-black w-full p-2 rounded-lg ${
                      gender === "Trans" && "ring-1 ring-black ring-offset-2"
                    }`}
                  >
                    Trans
                  </p>
                </div>
              </div>
              <div className="flex gap-40 mt-10">
                <button
                  onClick={() => setAccountOpen(false)}
                  className="w-full mb-10 border border-black p-3 rounded-lg text-base font-semibold"
                >
                  Cancel
                </button>
                <button
                  disabled={isAccountValidButton}
                  type="submit"
                  className={`w-full border mb-10 border-black bg-black text-white p-3 rounded-lg text-base font-semibold ${
                    isAccountValidButton
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                      : "bg-black text-white hover:bg-opacity-90 border-black"
                  }`}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {shippingOpen && (
        <div className="absolute shadow-lg z-50 top-28 left-96 flex flex-col gap-10  bg-white w-1/2 rounded-2xl ">
          <div className="flex justify-between border-b border-slate-400 items-center pt-5 pb-3 px-10">
            <h1 className="text-2xl font-bold  ">Shipping Address</h1>
            <IoIosClose
              className="text-4xl cursor-pointer"
              onClick={() => setShippingOpen(false)}
            />
          </div>
          <form onSubmit={handleAddressSubmit}>
            <div className="flex flex-col gap-5 px-10">
              <ProfileInput
                type="text"
                label="Street"
                name="street"
                value={addressData.street}
                onChange={handleAddressChange}
              />
              <div className="flex gap-5">
                <ProfileInput
                  type="text"
                  label="City"
                  name="city"
                  value={addressData.city}
                  onChange={handleAddressChange}
                />
                <ProfileInput
                  type="text"
                  label="State"
                  name="state"
                  value={addressData.state}
                  onChange={handleAddressChange}
                />
              </div>
              <div className="flex gap-5">
                <ProfileInput
                  type="text"
                  label="Country"
                  name="country"
                  value={addressData.country}
                  onChange={handleAddressChange}
                />
                <ProfileInput
                  type="number"
                  label="Zip code"
                  name="zip"
                  value={addressData.zip}
                  onChange={handleAddressChange}
                />
              </div>

              <div className="flex gap-40 mt-10">
                <button
                  onClick={() => setShippingOpen(false)}
                  className="w-full mb-10 border border-black p-3 rounded-lg text-base font-semibold"
                >
                  Cancel
                </button>
                <button
                disabled={isAddressValidButton}
                  type="submit"
                  className={`w-full border mb-10 border-black bg-black text-white p-3 rounded-lg text-base font-semibold ${
                    isAddressValidButton
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                      : "bg-black text-white hover:bg-opacity-90 border-black"
                  }`}
                >
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UserProfile;
