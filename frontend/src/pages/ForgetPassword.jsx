import React, { useState } from "react";
import ProfileInput from "../components/ProfileInput";
import useForm from "../hooks/useForm";
import axios from "axios";
import ButtonLoading from "../components/ButtonLoading";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate =useNavigate()
  const [forgetPasswordStatus, setForgetPasswordStatus] =
    useState("sendOtp");
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");
  const [sendLoading, setSendLoading] = useState(false);
  //Send Otp configuration
  const { values: emailData, handleChange: emailHandleChange } = useForm({
    email: "",
  });
  const handleSendOtpSubmit = async (e) => {
    e.preventDefault();
    setSendLoading(true);
    try {
      // console.log(emailData)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`,
        emailData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      setForgetPasswordStatus("verifyOtp");
    } catch (err) {
      console.log(err);
    } finally {
      setSendLoading(false);
    }
  };
  //verify Otp configuration
  const { values: otpData, handleChange: otpHandleChange } = useForm({
    otp: "",
  });
  const handleVerifyOtpSubmit = async (e) => {
    setOtpErrorMessage("");
    setOtpSuccessMessage("");
    e.preventDefault();
    try {
      // console.log(otpData)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`,
        {
          email: emailData.email,
          otp: otpData.otp,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      setOtpSuccessMessage(response.data.message);
      setForgetPasswordStatus("changePassword");
    } catch (err) {
      console.log(err);
      setOtpErrorMessage(err?.response?.data?.message);
    }
  };

  //change password config
  const {
    values: passwordData,
    handleChange: passwordHandleChange,
    resetForm,
  } = useForm({
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    setPasswordErrorMessage("");
    setPasswordSuccessMessage("");
    try {
    //   console.log(passwordData);
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/change-password`,
        {
            email:emailData.email,
            newPassword:passwordData.newPassword,
            confirmPassword:passwordData.confirmPassword,
        },
        {
            headers: { "Content-Type": "application/json" },
          }
    );
    console.log(response.data.message);
    setPasswordSuccessMessage(response.data.message);
    resetForm();
    setTimeout(()=>{
        navigate('/login');
    },1000)
    } catch (err) {
      console.log(err);
      setPasswordErrorMessage(err.response?.data?.message)
    }
  };

  return (
    <>
      {forgetPasswordStatus === "sendOtp" && (
        <div className="py-28 px-16 flex w-full h-screen justify-center items-center">
          <div className="flex flex-col bg-white w-1/2 rounded-xl shadow-md gap-5 py-6 px-10">
            <div className="flex justify-center border-b border-slate-300 pb-4">
              <h1 className="text-3xl font-bold ">Forget Password</h1>
            </div>
            <form onSubmit={handleSendOtpSubmit}>
              <div className="flex flex-col gap-5">
                <ProfileInput
                  label="Email"
                  type="email"
                  name="email"
                  value={emailData?.email}
                  onChange={emailHandleChange}
                />
                <button className="text-lg mt-3 bg-black py-3 text-white font-bold rounded-xl hover:opacity-90">
                  {sendLoading ? (
                    <ButtonLoading size="4" color="black" />
                  ) : (
                    "Send OTP"
                  )}
                </button>
                <p className="text-base text-center text-slate-600">
                  Get the otp on your email and verify!
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      {forgetPasswordStatus === "verifyOtp" && (
        <div className="py-28 px-16 flex w-full h-screen justify-center items-center">
          <div className="flex flex-col bg-white w-1/2 rounded-xl shadow-md gap-5 py-6 px-10">
            <div className="flex justify-center border-b border-slate-300 pb-4">
              <h1 className="text-3xl font-bold ">Enter the OTP</h1>
            </div>
            <form onSubmit={handleVerifyOtpSubmit}>
              <div className="flex flex-col gap-5">
                <ProfileInput
                  label="OTP"
                  type="number"
                  name="otp"
                  value={otpData.otp}
                  onChange={otpHandleChange}
                />
                {otpErrorMessage && (
                  <p className="text-sm md:text-base  text-red-500">
                    {otpErrorMessage}
                  </p>
                )}
                {otpSuccessMessage && (
                  <p className="text-sm md:text-base  text-green-500">
                    {otpSuccessMessage}
                  </p>
                )}
                <button
                  type="submit"
                  className="text-lg mt-3 bg-black py-3 text-white font-bold rounded-xl hover:opacity-90"
                >
                  Verify OTP
                </button>
                <p className="text-base text-center text-slate-600">
                  Get the otp on your email and verify!
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      {forgetPasswordStatus === "changePassword" && (
        <div className="py-28 px-16 flex w-full h-screen justify-center items-center">
          <div className="flex flex-col bg-white w-1/2 rounded-xl shadow-md gap-5 py-6 px-10">
            <div className="flex justify-center border-b border-slate-300 pb-4">
              <h1 className="text-3xl font-bold ">Change your password</h1>
            </div>
            <form onSubmit={handlePasswordChangeSubmit}>
              <div className="flex flex-col gap-5">
                <ProfileInput
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={passwordHandleChange}
                />
                <ProfileInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={passwordHandleChange}
                />
                {passwordErrorMessage&& (
                  <p className="text-sm md:text-base  text-red-500">
                    {passwordErrorMessage}
                  </p>
                )}
                {passwordSuccessMessage && (
                  <p className="text-sm md:text-base  text-green-500">
                    {passwordSuccessMessage}
                  </p>
                )}
                <button
                  type="submit"
                  className="text-lg mt-3 bg-black py-3 text-white font-bold rounded-xl hover:opacity-90"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
