// src/components/pages/Register.jsx

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { createAccount } from "../../redux/actions/authActions";
import {
  selectAuthLoading,
  selectAuthError,
} from "../../redux/selectors/authSelector";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTheme } from "../../appContext/appContext";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { BiUser } from "react-icons/bi";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "jane Smith",
      email: "email@example.com",
      password: "Password@1234",
      confirmPassword: "Password@1234",
    },
  });
  const password = watch("password");
  // submit user data to appwrite endpoint
  const onSubmit = async (data) => {
    try {
      await dispatch(
        createAccount(
          data.email,
          data.password,
          data.name,
          data.confirmPassword
        )
      );
      navigate("/Login"); // Redirect to dashboard on successful registration
    } catch (err) {
      setError("password", {
        message: err.message,
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const { themeMode } = useTheme();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section
      className={`w-full h-full flex items-center justify-center bg-no-repeat bg-cover bg-center + ${
        themeMode === "light"
          ? 'bg-[url("https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=600")]'
          : 'bg-[url("https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=600")]'
      }`}>
      <section className="w-full h-full flex items-center justify-center shadow-2xl rounded-lg z-50 backdrop-blur-2xl px-40 ">
        <div className="flex-1 h-full flex flex-col gap-2 items-center justify-center p-1">
          <p className="w-full flex items-center justify-start border-b border-orange-500 mb-5">
            Provide login details
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 h-auto">
            <div className="w-full flex flex-col items-start justify-center p-2 mb-2 ">
              <strong className="w-full text-start text-2xl">
                Glad you are here!
              </strong>
              <p className="text-sm my-2">
                Amazing offers await you! register now to access our great
                products
              </p>
            </div>
            <div className="w-full flex flex-col items-start gap-1 mb-2">
              <label
                htmlFor="text"
                className="w-full flex items-center justify-start gap-1">
                <BiUser /> Full Name
              </label>
              <input
                type="text"
                id="text"
                placeholder="please enter your full name"
                {...register("name", {
                  required: " please enter your name",
                })}
                className="w-full h-11 indent-2 shadow-lg border rounded focus:outline-none"
              />
              {errors.name && (
                <span className="text-orange-500 w-full flex items-center justify-center">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-1 mb-2">
              <label
                htmlFor="email"
                className="w-full flex items-center justify-start gap-1">
                <MdEmail /> Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "email is required",
                })}
                className="w-full h-11 indent-2 shadow-lg border rounded focus:outline-none"
              />
              {errors.email && (
                <span className="text-orange-500 w-full flex items-center justify-center">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-1 mb-2 relative">
              <label
                htmlFor="password"
                className="w-full flex items-center justify-start gap-1">
                <FaLock />
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 8,
                    message: "must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "must contain at least one uppercase letter, one lowercase letter, one number",
                  },
                })}
                className="w-full h-11 indent-2 shadow-lg border rounded focus:outline-none"
              />

              {errors.password && (
                <span className="text-orange-500 w-full flex items-center justify-center">
                  {errors.password.message}
                </span>
              )}
              <button
                type="button"
                className="w-7 h-7 rounded-full text-gray-500 hover:bg-gray-300 duration-300 absolute right-2 top-9 text-xl flex items-center justify-center"
                onClick={handleShowPassword}>
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>
            <div className="w-full flex flex-col items-start gap-1 mb-2 relative">
              <label
                htmlFor="confirmPassword"
                className="w-full flex items-center justify-start gap-1">
                <FaLock />
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Enter password again..."
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full h-11 indent-2 shadow-lg border rounded focus:outline-none"
              />
              {errors.confirmPassword && (
                <span className="text-orange-500 w-full flex items-center justify-center">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <p className="w-full flex items-center justify-between p-2 text-sm">
              <small>
                By signing up, you agree to our terms of service and privacy
                policy.
              </small>
              <NavLink
                to={`/AboutUs`}
                className="text-orange-500 hover:text-orange-600 text-sm">
                Learn more
              </NavLink>
            </p>
            {error && (
              <span className="text-orange-500 w-full flex items-center justify-center">
                {error}
              </span>
            )}
            <div className="w-full flex flex-col items-center justify-center gap-3 mb-2">
              <button
                type="submit"
                disabled={isLoading}
                className="h-10 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold rounded-lg duration-300 hover:opacity-50 active:translate-y-0.5">
                {isLoading ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                className="h-10 w-full border-2 font-bold rounded-lg duration-300 hover:opacity-50 active:translate-y-0.5 flex items-center justify-center gap-4">
                <span className="text-2xl">
                  <FcGoogle />
                </span>
                Register with google
              </button>
            </div>
            <small>copyright @ PlanZen 2024</small>
          </form>
        </div>
        <div className="flex-1 h-4/5 flex flex-col gap-2 items-center justify-center p-1 rounded-3xl border-2 border-gray-400">
          <h2>
            <strong className=" w-full text-center text-3xl">
              Good to See You!
            </strong>
          </h2>
          <p className="w-full p-2 text-center flex items-center justify-center">
            {`PlanZen is a simple and intuitive calendar application that helps you organize and schedule your tasks.`}
          </p>
          <p className="flex gap-2">
            {`Already have an account?`}
            <NavLink
              to={"/Register"}
              className={`text-orange-500 hover:underline`}>
              Click here to Login
            </NavLink>
          </p>
        </div>
      </section>
    </section>
  );
};

export default Register;
