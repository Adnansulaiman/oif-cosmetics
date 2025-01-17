import React, { useState ,useEffect,useRef} from "react";
// import ProfileImage from "../assets/images/profile-1.jpeg";
import { BsUpload } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
// import { CiMail,CiPhone } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import ButtonLoading from "../components/ButtonLoading";
// import WarningPopup from "../components/WarningPopup";

const Profile = () => {
  const { userData,setUserData } = useAuth();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [showUploadButton,setShowUploadButton] = useState(false);
  const [imageLoading,setImageLoading] = useState(false);
  const uploadRef = useRef();
  const fileInputRef = useRef();
    useEffect(() => {
      const handleClickCloseMenu = (event) => {
        if (uploadRef.current && !uploadRef.current.contains(event.target)) {
          setUploadOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickCloseMenu);
      return () => {
        document.removeEventListener("mousedown", handleClickCloseMenu);
      };
    }, [setUploadOpen]);

    const handleFileChange = () => {
      const file = fileInputRef.current?.files[0];
      setShowUploadButton(!!file); // Show the upload button only if a file is selected
    };

    const handleUploadProfileImage = async () => {
      setImageLoading(true);
      setUploadOpen(false)
      try {
        const file = fileInputRef.current?.files[0]; // Get the selected file
        if (!file) {
          console.error("No file selected");
          return;
        }
        setShowUploadButton(true);
        const formData = new FormData();
        formData.append("profileImage", file); // Append the file to the FormData object
  
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `http://localhost:3000/api/user/upload-image`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Set proper header for file upload
            },
          }
        );
        // console.log(response.data);
        setUserData(response.data.user);
        setShowUploadButton(false);
      } catch (err) {
        console.error(err);
      }finally{
        setImageLoading(false);
      }
    };

    const handleDeleteProfileImage = async() =>{
      try{
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:3000/api/user/delete-image`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        setUserData(response.data.user)
        setUploadOpen(false)
      }catch(err){
        console.log(err)
      }
    }
  return (
    <div className=" pt-20 md:pt-24 px-6 md:px-12 flex flex-col h-screen">
      <h1 className=" text-xl md:text-3xl font-bold">Profile</h1>
      <div className="flex flex-col md:flex-row mt-4 md:mt-8 gap-4">
        <div className="flex  md:flex-col w-full  md:w-1/5 bg-white rounded-xl flex-row">
          <div className=" relative border-e md:border-e-0  md:border-b border-slate-300 flex flex-col justify-center items-center ">
            <img
              src={userData?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt={`Profile Image`}
              className=" rounded-full shadow-md w-28 md:w-48 mt-6   "
            />
            <FiPlus
              onClick={() => setUploadOpen(true)}
              className="absolute right-12 bottom-20 md:right-16 ring-4 ring-white cursor-pointer  border border-black bg-white text-2xl md:text-4xl p-1 md:p-2 rounded-full"
            />
            <h1 className="text-lg md:text-2xl font-bold mt-1 md:mt-3">
              {userData?.firstName + " " + userData?.lastName}
            </h1>
            <p className=" text-xs md:text-sm font-medium text-slate-600 px-10 mb-5 md:mb-3">
              {userData?.email}
            </p>
            {imageLoading && (
              <div className="absolute">
                <ButtonLoading size='16' color='black' />

              </div>
            )}
            {uploadOpen && (
              <div ref={uploadRef} className=" absolute bottom-5 right-16 flex flex-col px-10 py-1 rounded-lg bg-white shadow-md ">
                <div className="relative w-full  mx-auto border-b py-2  border-slate-500">
                  
                  <input
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <label
                    htmlFor="file-upload"
                    className="text-lg font-semibold flex items-center justify-center gap-2 text-blue-600 cursor-pointer"
                  >
                    <BsUpload />
                    Upload
                  </label>
                 
                </div>
                {showUploadButton && (
                  <button
                  onClick={handleUploadProfileImage}
                  className="text-lg font-semibold flex items-center justify-center gap-2 bg-blue-500 text-white rounded-lg  py-2"
                >
                  Submit
                </button>
                )}
                <p onClick={handleDeleteProfileImage} className="text-lg font-semibold flex items-center justify-center gap-2 text-red-600 py-2 cursor-pointer">
                  <MdDeleteOutline className="text-xl" />
                  Delete
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 px-16 md:px-10 py-5 ">
            <Link to="/profile">
              <p className="text-base font-semibold">User Profile</p>
            </Link>
            <Link to="/profile/security">
              <p className="text-base font-semibold">Security</p>
            </Link>
            <Link to="/profile/orders">
              <p className="text-base font-semibold">Orders</p>
            </Link>
            <Link to="/profile/wishlist">
              <p className="text-base font-semibold border-b border-slate-300 pb-3">
                Wishlist
              </p>
            </Link>
            <p className="text-base font-semibold text-red-500">Logout</p>
          </div>
          {/* {warningOpen && (
            <WarningPopup />
          )} */}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
