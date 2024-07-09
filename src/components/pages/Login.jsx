// src/components/pages/Login.jsx
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authActions";
import {
  selectAuthLoading,
  selectAuthError,
} from "../../redux/selectors/authSelector";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTheme } from "../../appContext/appContext";
import { FcGoogle } from "react-icons/fc";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [showPassword, setShowPassword] = useState(false);

  const { themeMode } = useTheme();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "email@example.com",
      password: "Password@1234",
    },
  });

  // submit user data to appwrite endpoint
  const onSubmit = async (data) => {
    try {
      dispatch(
        loginUser(
          data.email,
          data.password,
          data.rememberMe ? "checked" : "unchecked"
        )
      );
      navigate("/Dashboard");
    } catch (err) {
      setError("password", {
        message: err.message,
      });
    }
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
            {isLoading ? "Processing..." : "Provide login details"}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="w-3/5 h-auto">
            <div className="w-full flex flex-col items-start justify-center p-2 mb-2 ">
              <strong className="w-full text-start text-2xl">
                Good to see you!
              </strong>
              <p className="text-sm my-2">
                Login to access our amazing products
              </p>
            </div>
            <div className="w-full flex flex-col items-start gap-1 mb-4">
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
            <div className="w-full flex flex-col items-start gap-1 mb-4 relative">
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
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </button>
            </div>
            <div className="w-full flex items-center justify-between p-1 mb-2 text-sm text-nowrap">
              <p className="flex-1 flex items-center justify-start h-10 gap-2">
                Forgot your password?
                <NavLink
                  to={"/ForgotPassword"}
                  className={"text-orange-500 hover:underline"}>
                  Click to reset
                </NavLink>
              </p>
              <div className="flex-1 flex items-center justify-end gap-2 h-10">
                <label htmlFor="remember">Remember Me</label>
                <input
                  type="checkbox"
                  id="remember"
                  {...register("remember")}
                />
              </div>
            </div>

            {error && (
              <span className="text-orange-500 w-full flex items-center justify-center">
                {error}
              </span>
            )}
            <div className="w-full flex flex-col items-center justify-center gap-3 mb-4">
              <button
                type="submit"
                disabled={isLoading}
                className="h-10 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 font-bold rounded-lg duration-300 hover:opacity-50 active:translate-y-0.5">
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <button
                type="button"
                className="h-10 w-full border-2 font-bold rounded-lg duration-300 hover:opacity-50 active:translate-y-0.5 flex items-center justify-center gap-4">
                <span className="text-2xl">
                  <FcGoogle />
                </span>
                Sign in with google
              </button>
            </div>

            <small>copyright @ PlanZen 2024</small>
          </form>
        </div>
        <div className="flex-1 h-4/5 flex flex-col gap-2 items-center justify-center p-1 rounded-3xl border-2 border-gray-400">
          <h2>
            <strong className=" w-full text-center text-3xl">
              Welcome! Buddy
            </strong>
          </h2>
          <p className="w-full p-2 text-center flex items-center justify-center">
            {`PlanZen is a simple and intuitive calendar application that helps you organize and schedule your tasks.`}
          </p>
          <p className="flex gap-2">
            {`Don't have an account?`}
            <NavLink
              to={"/Register"}
              className={`text-orange-500 hover:underline`}>
              Register here
            </NavLink>
          </p>
        </div>
      </section>
    </section>
  );
};

export default Login;
