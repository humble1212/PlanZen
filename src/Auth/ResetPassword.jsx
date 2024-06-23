import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import Generatepassword from "./Generatepassword";
import { useTheme } from "../appContext/appContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaLock } from "react-icons/fa";

const signupSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export default function ResetPassword() {
  const [seePassword, setSeePassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const { themeMode } = useTheme();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: "",
      confirm: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordMatch((prev) => !prev);
    } else {
      setPasswordMatch(false);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Login data:", data);
        navigate("/LoginForm");
      } catch (error) {
        setError("root", {
          type: "server",
          message: error.message,
        });
      }
    }
  };

  const toggleShowPassword = () => {
    setSeePassword(!seePassword);
  };

  return (
    <section className="login-container">
      <div className="LoginPage ">
        <div
          className={`form--page border-r border-gray-400 ${
            themeMode === "light" ? "bg-teal-50" : "bg-inherit"
          }`}>
          <header className="loginHeader">
            <p>{isSubmitting ? "Please wait..." : "Password reset"}</p>
            <h1>Password Reset</h1>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul>
              <li>
                <label htmlFor="Password">
                  <span className="flex-1 flex items-center justify-start gap-2">
                    <FaLock />
                    Password
                  </span>
                </label>
                <input
                  type={seePassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-orange-600 ">
                    {errors.password.message}
                  </span>
                )}
                <span className="view--password" onClick={toggleShowPassword}>
                  {seePassword ? <BiHide /> : <BiShow />}
                </span>
              </li>
              <li>
                <label htmlFor="confirm">
                  <FaLock />
                  Confirm Password
                </label>
                <input
                  type={seePassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <span className="text-orange-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
                {passwordMatch && (
                  <span className="text-orange-500">password do not match</span>
                )}
              </li>
              <li>
                {errors.root && (
                  <span className="text-orange-500">{errors.root.message}</span>
                )}
              </li>
              <li
                style={{ display: "flex", flexDirection: "row" }}
                className=" gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-11 rounded-lg bg-teal-950 text-white font-semibold duration-200 active:translate-y-0.5 hover:opacity-75">
                  {isSubmitting ? "Loading..." : "Submit"}
                </button>
                <button
                  type="reset"
                  className="flex-1 h-11 rounded-lg bg-orange-500 text-white font-semibold duration-200 active:translate-y-0.5 hover:opacity-75">
                  <NavLink to="/LoginForm">Back to Login</NavLink>
                </button>
              </li>
            </ul>
          </form>
        </div>
        <article className="page-two text-white">
          <Generatepassword />
        </article>
      </div>
    </section>
  );
}
