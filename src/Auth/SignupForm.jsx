import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import Generatepassword from "./Generatepassword";
import { useTheme } from "../appContext/appContext";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaLock, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const signupSchema = z.object({
  email: z.string().email(),
  userName: z.string().min(3).max(20),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export default function SignupForm() {
  const [seePassword, setSeePassword] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const { themeMode } = useTheme();

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setSeePassword(!seePassword);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      userName: "john Doe",
      email: "example@email.com",
      password: "",
      confirm: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordMatch((prev) => !prev);
    } else {
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

  return (
    <section className="login-container">
      <div className="LoginPage ">
        <div
          className={`form--page border-r + ${
            themeMode === "light" ? "bg-teal-50" : "bg-inherit "
          }`}>
          <header className="loginHeader">
            <p>{isSubmitting ? "Please wait..." : "Provide details"}</p>
            <h1>Signup</h1>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul>
              <li>
                <label htmlFor="userName">
                  <FaUser /> Full Name
                </label>
                <input
                  type="text"
                  {...register("userName", {
                    required: "User name is required",
                  })}
                />
                {errors.userName && (
                  <span className="text-orange-600 ">
                    {errors.userName.message}
                  </span>
                )}
              </li>
              <li>
                <label htmlFor="email">
                  <MdEmail /> Email
                </label>
                <input type="text" {...register("email")} />
                {errors.email && (
                  <span className="text-orange-600 ">
                    {errors.email.message}
                  </span>
                )}
              </li>
              <li>
                <label htmlFor="Password">
                  <span className="flex-1 flex items-center justify-start gap-2">
                    <FaLock />
                    Password
                  </span>
                  <span
                    className="flex-1 flex items-center justify-end gap-2 text-sm cursor-pointer hover:underline duration-300 hover:opacity-70 active:translate-y-0.5"
                    onClick={() => {
                      setGeneratePassword((prev) => !prev);
                    }}>
                    Open Generator
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
                  <span className="text-orange-600 ">
                    {errors.confirmPassword.message}
                  </span>
                )}
                {passwordMatch && (
                  <span className="text-orange-500">password do not match</span>
                )}
              </li>

              <li
                style={{ display: "flex", flexDirection: "row" }}
                className=" gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 h-11 rounded-lg bg-teal-950 text-white font-semibold duration-200 active:translate-y-0.5 hover:opacity-75 `}>
                  {isSubmitting ? "Loading..." : "Submit"}
                </button>
                <button
                  type="reset"
                  className="flex-1 h-11 rounded-lg bg-orange-500 text-white font-semibold duration-200 active:translate-y-0.5 hover:opacity-75">
                  Cancel
                </button>
              </li>

              <li>
                {errors.root && (
                  <span className="text-orange-500">{errors.root.message}</span>
                )}
              </li>

              <li
                className=""
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "10px",
                }}>
                <strong className="text-center capitalize text-sm">
                  or sign in with
                </strong>
                <button
                  type="button"
                  className="w-1/2 h-12 rounded-full border border-gray-500 font-semibold duration-200 active:translate-y-0.5 hover:opacity-85 mt-2">
                  Google
                </button>
              </li>
            </ul>
          </form>
        </div>
        <div className="page-two text-white">
          {!generatePassword && (
            <>
              <h1 className="text-4xl font-semibold">Let go together...!</h1>
              <p className="w-3/4 text-center text-balance my-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
                dolor nemo libero necessitatibus deleniti illum adipisci,
                quibusdam.
              </p>
              <p className=" flex items-center justify-center gap-2">
                Have an account already?
                <NavLink
                  to={"/LoginForm"}
                  className={"text-orange-500 hover:underline"}>
                  Login Instead
                </NavLink>
              </p>
            </>
          )}
          {generatePassword && <Generatepassword />}
        </div>
      </div>
    </section>
  );
}
