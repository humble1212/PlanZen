import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTheme } from "../../appContext/appContext";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/Auth";
import { login } from "../../redux/slices/authSlice";
import LoadingSpinner from "../common/spinners/LoadingSpinner";
import { useState } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { themeMode } = useTheme();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login({ userData: currentUser }));
        }
        navigate("/Login");
      }
    } catch (err) {
      setError("password", {
        message: err.message,
      });
    }
  };

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setValue("password", newPassword);
    setValue("confirmPassword", newPassword);
    setShowPassword(true);
  };

  const inputClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
    themeMode === "light"
      ? "border-gray-300 bg-white text-gray-900"
      : "border-gray-600 bg-gray-700 text-white"
  }`;

  const labelClasses = `block text-sm font-medium mb-1 group-hover:text-indigo-600 transition-colors duration-200 ${
    themeMode === "light" ? "text-gray-700" : "text-gray-200"
  }`;

  return (
    <section
      className={`min-h-screen flex items-center justify-center ${
        themeMode === "light"
          ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
          : "bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950"
      }`}>
      <div
        className={`p-8 rounded-2xl shadow-2xl w-full max-w-6xl flex overflow-hidden ${
          themeMode === "light" ? "bg-white" : "bg-gray-800"
        }`}>
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join PlanZen Today!
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="group">
              <label htmlFor="name" className={labelClasses}>
                <FaUserAlt className="inline mr-2" /> Full Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Please enter your name" })}
                className={inputClasses}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="group">
              <label htmlFor="email" className={labelClasses}>
                <MdEmail className="inline mr-2" /> Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className={inputClasses}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="group relative">
              <label htmlFor="password" className={labelClasses}>
                <FaLock className="inline mr-2" /> Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                  },
                })}
                className={inputClasses}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className={`absolute right-3 top-8 hover:text-indigo-600 transition-colors duration-200 ${
                  themeMode === "light" ? "text-gray-500" : "text-gray-400"
                }`}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="group">
              <label htmlFor="confirmPassword" className={labelClasses}>
                <FaLock className="inline mr-2" /> Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={inputClasses}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={generatePassword}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300">
              Generate Strong Password
            </button>

            <p
              className={`text-sm ${
                themeMode === "light" ? "text-gray-600" : "text-gray-400"
              }`}>
              By signing up, you agree to our{" "}
              <NavLink to="/terms" className="text-indigo-600 hover:underline">
                terms of service
              </NavLink>{" "}
              and{" "}
              <NavLink
                to="/privacy"
                className="text-indigo-600 hover:underline">
                privacy policy
              </NavLink>
              .
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? <LoadingSpinner /> : "Create Account"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div
                  className={`w-full border-t ${
                    themeMode === "light"
                      ? "border-gray-300"
                      : "border-gray-600"
                  }`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className={`px-2 ${
                    themeMode === "light"
                      ? "bg-white text-gray-500"
                      : "bg-gray-800 text-gray-400"
                  }`}>
                  Or sign up with
                </span>
              </div>
            </div>

            <button
              type="button"
              className={`mt-4 w-full flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-all duration-200 ${
                themeMode === "light"
                  ? "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                  : "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
              }`}>
              <FcGoogle className="w-5 h-5 mr-2" />
              Sign up with Google
            </button>
          </div>

          <p
            className={`mt-8 text-center text-sm ${
              themeMode === "light" ? "text-gray-600" : "text-gray-400"
            }`}>
            Already have an account?{" "}
            <NavLink
              to="/Login"
              className={`font-medium transition-colors duration-200 ${
                themeMode === "light"
                  ? "text-indigo-600 hover:text-indigo-800"
                  : "text-indigo-400 hover:text-indigo-300"
              }`}>
              Log in here
            </NavLink>
          </p>
        </div>

        <div className="w-1/2 pl-8 flex flex-col justify-center items-center">
          <div
            className={`w-full h-full rounded-2xl p-8 flex flex-col justify-center items-center animate-float ${
              themeMode === "light" ? "bg-indigo-100" : "bg-indigo-900"
            }`}>
            <svg
              className={`w-64 h-64 mb-8 ${
                themeMode === "light" ? "text-indigo-600" : "text-indigo-300"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                fill="currentColor"
              />
            </svg>
            <h3
              className={`text-2xl font-bold mb-4 ${
                themeMode === "light" ? "text-indigo-800" : "text-indigo-200"
              }`}>
              Welcome to PlanZen!
            </h3>
            <p
              className={`text-center ${
                themeMode === "light" ? "text-indigo-600" : "text-indigo-300"
              }`}>
              PlanZen is a simple and intuitive calendar application that helps
              you organize and schedule your tasks efficiently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
