import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { NavLink } from "react-router-dom";

import { useTheme } from "../appContext/appContext";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
// import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginForm() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  const [seePassword, setSeePassword] = useState(false);

  const toggleShowPassword = () => {
    setSeePassword(!seePassword);
  };

  const { themeMode } = useTheme();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "example@email.com",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login data:", data);
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message,
      });
    }
  };

  return (
    <section className="login-container">
      <div className="LoginPage ">
        <div
          className={`form--page border-r + ${
            themeMode === "light" ? "bg-teal-50" : "bg-inherit "
          }`}>
          <header className="loginHeader ">
            <p>{isSubmitting ? "Please wait..." : "Provide Login details"}</p>
            <h1>Login</h1>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul>
              <li>
                <label htmlFor="email">
                  <MdEmail /> Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-orange-600 ">
                    {errors.email.message}
                  </span>
                )}
              </li>
              <li>
                <label htmlFor="Password">
                  <FaLock />
                  Password
                </label>
                <input
                  type={seePassword ? "text" : "password"}
                  name="Password"
                  id="Password"
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

              <li style={{ display: "flex", flexDirection: "row" }}>
                <div className=" flex flex-1 items-center justify-start gap-2">
                  <label htmlFor="keepme" style={{ width: "max-content" }}>
                    Keep me logged in
                  </label>
                  <input
                    type="checkbox"
                    id="remember-me"
                    name="rememberMe"
                    onChange={handleRememberMeChange}
                  />
                </div>
                <div className=" flex flex-1 items-center justify-end gap-2">
                  <NavLink
                    to={"/ResetPassword"}
                    className={`hover:text-blue-400 hover:underline duration-300`}>
                    Forgot password?
                  </NavLink>
                </div>
              </li>
              <li>
                {errors.root && (
                  <span className="text-orange-600 ">
                    {errors.root.message}
                  </span>
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
                  Cancel
                </button>
              </li>

              <li
                className=""
                style={{
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
        <article className="page-two text-white">
          <h1 className="text-4xl font-semibold">Welcome Back, Friend</h1>
          <p className="w-3/4 text-center text-balance my-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae
            dolor nemo libero necessitatibus deleniti illum adipisci, quibusdam.
          </p>
          <p className=" flex items-center justify-center gap-2">
            {`You don't have an account yet?`}
            <NavLink
              to={"/SignupForm"}
              className={"text-yellow-500 hover:underline"}>
              Signup Instead
            </NavLink>
          </p>
        </article>
      </div>
    </section>
  );
}
