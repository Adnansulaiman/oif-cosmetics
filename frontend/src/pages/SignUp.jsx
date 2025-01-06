import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/images/signup-1.jpg";
import { FcGoogle } from "react-icons/fc";
import useForm from "../hooks/useForm";
import { useState } from "react";
import axios from "axios";
import ButtonLoading from "../components/ButtonLoading";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const {login,setUserData} = useAuth()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialValue = {
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { values: formData, handleChange, resetForm } = useForm(initialValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    const isPasswordSame = formData?.password === formData?.confirmPassword;
    if (!isPasswordSame) {
      setErrorMessage("Password must be same.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage(response.data.message);
      resetForm();
      login(response.data.token)
      setUserData(response.data.user);
      // localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setErrorMessage(err.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  const isButtonDisabled =
    !formData?.firstName ||
    !formData?.lastName ||
    !formData?.email ||
    !formData?.password ||
    !formData?.confirmPassword;

  return (
    <div className="flex md:flex-row flex-col-reverse  text-white  md:text-black ">
      <div className="flex absolute md:static flex-col justify-center  gap-3 px-10 md:px-32 w-full h-full  md:w-1/2">
        <h1 className="text-5xl text-center md:text-6xl font-bold  md:mt-28">
          Create an account
        </h1>
        <p className=" mb-5 font-semibold px-3 md:text-base text-sm">
          Already have an account?{" "}
          <span className="cursor-pointer underline hover:opacity-80">
            <Link to="/login">Login</Link>
          </span>
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={formData?.firstName}
              onChange={handleChange}
              className="placeholder:text-white md:placeholder:text-black w-full mb-3 h-12 rounded-xl px-5 border outline-none bg-transparent md:border-black"
            />
            <input
              type="text"
              placeholder="Second name"
              name="lastName"
              value={formData?.lastName}
              onChange={handleChange}
              className="placeholder:text-white md:placeholder:text-black  w-full h-12 rounded-xl px-5 border outline-none bg-transparent md:border-black"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            className="placeholder:text-white md:placeholder:text-black w-full mb-3 h-12 rounded-xl px-5 border outline-none bg-transparent md:border-black"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData?.password}
            onChange={handleChange}
            className="placeholder:text-white md:placeholder:text-black w-full h-12 mb-3 rounded-xl px-5 border outline-none bg-transparent md:border-black"
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData?.confirmPassword}
            onChange={handleChange}
            className="placeholder:text-white md:placeholder:text-black w-full h-12 rounded-xl px-5 border outline-none bg-transparent md:border-black"
          />
          <div className="flex justify-between items-center px-1 mt-3">
            <div className="flex gap-3 mb-3  items-center   ">
              <input
                type="checkbox"
                className="w-4 h-4 accent-black cursor-pointer"
              />
              <p className="text-sm  md:text-base">
                I agree to the{" "}
                <span className="underline">Terms & Conditions</span>
              </p>
            </div>
          </div>
          {setErrorMessage && (
            <p className="text-sm md:text-base  text-red-500">{errorMessage}</p>
          )}
          {setSuccessMessage && (
            <p className="text-sm md:text-base  text-green-500">
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full h-12 text-center bg-black text-white mt-10 rounded-xl hover:bg-white border border-black hover:text-black text-lg font-semibold ${
              isButtonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
                : "bg-black text-white hover:bg-opacity-90 border-black"
            }  `}
          >
            {loading ? <ButtonLoading color="black" size="8" /> : "Sign Up"}
          </button>
          <button className="w-full h-12 text-center bg-white  mt-3 rounded-xl hover:bg-black border border-white hover:border-black md:border-black text-black hover:text-white text-lg font-semibold flex gap-3 items-center justify-center  ">
            <FcGoogle className="text-3xl" /> <p>Sign Up With Google</p>
          </button>
        </form>
      </div>
      <div
        className="flex flex-col justify-end w-full md:w-1/2 px-10 py-20  h-screen bg-cover bg-center   "
        style={{ backgroundImage: `url(${Image})` }}
      >
        <h1 className="text-8xl md:flex hidden font-extrabold text-white">
          Get Everything You Want
        </h1>
      </div>
    </div>
  );
};

export default SignUp;
