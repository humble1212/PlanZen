import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../redux/selectors/authSelector";
import { logoutUser } from "../../redux/actions/authActions";
import { NavLink } from "react-router-dom";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../../appContext/appContext";
import { useState } from "react";
import { IoMdLogOut } from "react-icons/io";

export default function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const [Userheight, setUserheight] = useState(0);
  const [toggleOn, setToggleOn] = useState(false);
  const { themeMode, darkTheme, lightTheme } = useTheme();

  return (
    <>
      {isAuthenticated ? (
        <header className="w-full h-12 flex items-center justify-center border-b border-gray-500 gap-2">
          <h1 className="text-2xl font-bold">PlanZen</h1>
          <nav className="app--mainHeader">
            <ul className="flex-1 flex items-center justify-center">
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <NavLink
                  to={"/"}
                  className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]">
                  Home
                </NavLink>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <NavLink
                  to={"/Donate"}
                  className="hover:text-[#007bff] block font-semibold text-[15px]">
                  Support Us
                </NavLink>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <NavLink
                  to={Location}
                  className="hover:text-[#007bff] block font-semibold text-[15px]">
                  Locate Us
                </NavLink>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <NavLink
                  to={"/About"}
                  className="hover:text-[#007bff] block font-semibold text-[15px]">
                  About
                </NavLink>
              </li>
              <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                <NavLink
                  to={"/ContactUs"}
                  className="hover:text-[#007bff] block font-semibold text-[15px]">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div
              className=" flex items-center justify-end gap-3 cursor-pointer p-1 active:translate-y-0.5 duration-200 hover:opacity-75"
              onClick={() => {
                setUserheight(Userheight === 0 ? "13.5rem" : 0);
              }}>
              <button
                type="button"
                className="flex items-center w-10 h-10 text-sm rounded-full ">
                <img
                  src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                  alt="Avatar"
                  className=" w-full h-full object-cover rounded-full"
                />
              </button>
              <p className="w-max p-1 flex flex-col items-start justify-center">
                <span className=" text-lg font-bold capitalize">
                  {user.name}
                </span>
                <span className=" text-sm ">{user.email}</span>
              </p>
            </div>
            <article
              className={`aboutMenu shadow-xl + ${
                Userheight === 0 ? "opacity-0" : "opacity-100"
              } + ${
                themeMode === "light"
                  ? "bg-black bg-opacity-75 text-white"
                  : "bg-gray-300 bg-opacity-75 text-black"
              }`}
              style={{ height: `${Userheight}` }}>
              <h1 className="w-full p-2 border-b border-slate-400 flex items-center justify-between ">
                <strong>PlanZen</strong>
                <div className="flex items-center justify-end gap-3 ">
                  <span
                    className="hover:bg-gray-600 p-1 w-7 h-7 rounded-full"
                    onClick={() => {
                      setToggleOn((prev) => !prev);
                      themeMode === "light" ? darkTheme() : lightTheme();
                    }}>
                    {toggleOn ? (
                      <MdDarkMode className="w-5 h-5" />
                    ) : (
                      <MdOutlineDarkMode className="w-5 h-5" />
                    )}
                  </span>
                </div>
              </h1>
              <div className=" w-full flex h-auto items-center justify-between gap-4 my-2 ">
                <div className="w-20 h-20 rounded-full p-1">
                  <img
                    src="https://images.pexels.com/photos/20470051/pexels-photo-20470051/free-photo-of-bearded-brunette-in-sunglasses.jpeg?"
                    alt="Avatar"
                    className=" w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <h2 className="text-xl font-semibold capitalize">
                    {user.name}
                  </h2>
                  <p className=" text-gray-300">{user.email}</p>
                  <NavLink
                    to={"/Profile"}
                    className="text-sm text-blue-400 underline py-1">
                    Open Profile Page
                  </NavLink>
                </div>
              </div>
              <div className="w-full">
                <button
                  className="w-full flex items-center justify-center gap-2 h-11 text-white font-bold bg-gradient-to-r from-red-300 to-gray-500 rounded-md"
                  onClick={handleLogout}>
                  <IoMdLogOut />
                  <span>Logout</span>
                </button>
              </div>
            </article>
          </nav>
        </header>
      ) : (
        <header className="flex shadow-md h-12 sm:px-10 tracking-wide relative z-50">
          <div className="flex flex-wrap items-center justify-between gap-5 w-full">
            <h1 className="text-3xl font-bold">PlanZen</h1>
            <div
              id="collapseMenu"
              className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
              <button
                id="toggleClose"
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 fill-black"
                  viewBox="0 0 320.591 320.591">
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"></path>
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"></path>
                </svg>
              </button>

              <ul className="lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                <li className="mb-6 hidden max-lg:block">
                  <img
                    src="https://readymadeui.com/readymadeui.svg"
                    alt="logo"
                    className="w-36"
                  />
                </li>
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <NavLink
                    to={"/"}
                    className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]">
                    Home
                  </NavLink>
                </li>
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <NavLink
                    to={"/Donate"}
                    className="hover:text-[#007bff] block font-semibold text-[15px]">
                    Support Us
                  </NavLink>
                </li>
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <NavLink
                    to={Location}
                    className="hover:text-[#007bff] block font-semibold text-[15px]">
                    Locate Us
                  </NavLink>
                </li>
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <NavLink
                    to={"/About"}
                    className="hover:text-[#007bff] block font-semibold text-[15px]">
                    About
                  </NavLink>
                </li>
                <li className="max-lg:border-b border-gray-300 max-lg:py-3 px-3">
                  <NavLink
                    to={"/ContactUs"}
                    className="hover:text-[#007bff] block font-semibold text-[15px]">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="flex max-lg:ml-auto space-x-3">
              <NavLink
                to={"/Login"}
                className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                Login
              </NavLink>
              <NavLink
                to={"/Register"}
                className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                Sign up
              </NavLink>

              <button id="toggleOpen" className="lg:hidden">
                <svg
                  className="w-7 h-7"
                  fill="#000"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
