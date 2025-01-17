import React, { useState } from 'react'
import ProfileInput from './ProfileInput'
import useForm from '../hooks/useForm';
import axios from 'axios';

const Security = () => {
  const [errorMessage,setErrorMessage] = useState(null)
  const [successMessage,setSuccessMessage] = useState(null)
  const {values:formData,handleChange,resetForm} = useForm({
    currentPassword:'',
    newPassword:'',
    confirmPassword:'',
  })

  const handleSubmit = async(e) =>{
    setErrorMessage('');
    setSuccessMessage('');
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/user/change-password`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.message);
      setSuccessMessage(response.data.message);
      resetForm()
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response?.data?.message)
    }
  }

  const isButtonDisabled = !formData?.currentPassword || !formData?.newPassword || !formData?.confirmPassword;

  return (
    <div className="flex flex-col bg-white rounded-xl w-full md:w-4/5 px-5 py-3">
      <h1 className="text-2xl md:text-3xl font-bold border-b border-slate-300 pb-3 ">
        Security
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full justify-center"
      >
        <div className="flex flex-col gap-5 w-full md:w-1/2 py-10 px-5 ">
          <ProfileInput
            label="Current Password"
            type="password"
            name="currentPassword"
            value={formData?.currentPassword}
            onChange={handleChange}
          />
          <ProfileInput
            label="New Password"
            type="password"
            name="newPassword"
            value={formData?.newPassword}
            onChange={handleChange}
          />
          <ProfileInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData?.confirmPassword}
            onChange={handleChange}
          />
          {setErrorMessage && (
            <p className="text-sm md:text-base  text-red-500">{errorMessage}</p>
          )}
          {setSuccessMessage && (
            <p className="text-sm md:text-base  text-green-500">
              {successMessage}
            </p>
          )}
        <div className="flex justify-between w-full mt-5 ">
          <button onClick={resetForm} className="text-lg font-bold border border-red-500 text-red-500 px-10 py-2 rounded-lg">
            Clear
          </button>
          <button disabled={isButtonDisabled} type='submit' className={`text-lg font-bold border border-red-500 bg-red-500 text-white px-8 py-2 rounded-lg ${isButtonDisabled
                ? "bg-red-300 text-white  cursor-not-allowed border-red-300"
                : "bg-red-500 text-white hover:bg-opacity-90 border-red-500"}`}>
            Change
          </button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default Security