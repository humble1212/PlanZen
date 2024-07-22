import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTheme } from "../../appContext/appContext";
import { FcGoogle } from "react-icons/fc";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import authService from "../../appwrite/Auth";
import { login as authLogin } from "../../redux/slices/authSlice";
import LoadingSpinner from "../common/spinners/LoadingSpinner";
import PlanZenLogo from "../common/spinners/PlanZenLogo";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { themeMode } = useTheme();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const session = await authService.loginUser(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          navigate("/dashboard");
        }
      }
    } catch (error) {
      setError("password", {
        message: "Incorrect email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={`min-h-full flex items-center justify-center ${
        themeMode === "light"
          ? "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
          : "bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950"
      }`}>
      <div
        className={`p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out ${
          themeMode === "light" ? "bg-white" : "bg-gray-800"
        }`}>
        <div className="mb-8 text-center">
          <PlanZenLogo className="w-20 h-20 mx-auto mb-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back!
          </h2>
          <p
            className={`mt-2 ${
              themeMode === "light" ? "text-gray-600" : "text-gray-300"
            }`}>
            Log in to access your PlanZen account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="group">
            <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 group-hover:text-indigo-600 transition-colors duration-200 ${
                themeMode === "light" ? "text-gray-700" : "text-gray-200"
              }`}>
              <MdEmail className="inline mr-2" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                themeMode === "light"
                  ? "border-gray-300 bg-white text-gray-900"
                  : "border-gray-600 bg-gray-700 text-white"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="group relative">
            <label
              htmlFor="password"
              className={`block text-sm font-medium mb-1 group-hover:text-indigo-600 transition-colors duration-200 ${
                themeMode === "light" ? "text-gray-700" : "text-gray-200"
              }`}>
              <FaLock className="inline mr-2" /> Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ${
                themeMode === "light"
                  ? "border-gray-300 bg-white text-gray-900"
                  : "border-gray-600 bg-gray-700 text-white"
              }`}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className={`ml-2 block text-sm ${
                  themeMode === "light" ? "text-gray-700" : "text-gray-200"
                }`}>
                Remember me
              </label>
            </div>
            <NavLink
              to="/PasswordResetComponent"
              className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
              Forgot password?
            </NavLink>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? <LoadingSpinner /> : "Log In"}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center justify-center w-full">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  themeMode === "light" ? "border-gray-300" : "border-gray-600"
                }`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${
                  themeMode === "light"
                    ? "text-gray-500 bg-white"
                    : "text-gray-400 bg-gray-800"
                }`}>
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className={`w-full flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-all duration-200 ${
                themeMode === "light"
                  ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                  : "border-gray-600 text-gray-200 hover:bg-gray-700"
              }`}>
              <FcGoogle className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>

        <p
          className={`mt-8 text-center text-sm ${
            themeMode === "light" ? "text-gray-600" : "text-gray-400"
          }`}>
          {`Don't have an account?`}
          <NavLink
            to="/Register"
            className={`font-medium transition-colors duration-200 ${
              themeMode === "light"
                ? "text-indigo-600 hover:text-indigo-800"
                : "text-indigo-400 hover:text-indigo-300"
            }`}>
            Sign up
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Login;
