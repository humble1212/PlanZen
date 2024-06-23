import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [userMenu, setUserMenu] = useState(false);
  const [height, setHeight] = useState(0);

  const headerLinkts = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/About",
    },
    {
      name: "Services",
      path: "/Services",
    },
    {
      name: "Contact",
      path: "/Contact",
    },
  ];

  const userLinks = [
    {
      icon: <CgProfile />,
      name: "View Profile",
      path: "/Profile",
    },
    {
      icon: <IoSettingsSharp />,
      name: "Settings",
      path: "/Settings",
    },
    {
      icon: <MdLogout />,
      name: "Logout",
      path: "/LoginForm",
    },
  ];

  return (
    <header className="rounded-lg w-full h-auto md:h-20 flex flex-wrap items-center justify-between mx-auto p-4 bg-white border-gray-200 dark:bg-gray-900 relative sm:flex ">
      <div className="flex-1 flex items-center justify-start space-x-3 rtl:space-x-reverse">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="PlanZen Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          PlanZen
        </span>
      </div>

      <div
        className={`w-full items-center justify-center md:flex md:flex-1 z-50 + ${
          userMenu ? "hidden" : " "
        }`}>
        <ul className="w-full flex flex-col font-medium p-4 md:p-0 my-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:my-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {headerLinkts.map((item, index) => {
            return (
              <li key={index} className=" flex items-center justify-center">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => {
                    return `block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 + ${
                      isActive
                        ? "border border-gray-700 rounded-lg bg-gray-600"
                        : " text-gray-900 md:p-0"
                    }`;
                  }}>
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-max justify-center md:flex-1 flex items-center md:justify-end gap-2">
        <button
          type="button"
          className="bg-white flex items-center justify-center w-10 h-10 text-gray-300 rounded-full md:hidden hover:bg-gray-500   dark:text-gray-100 dark:bg-gray-500 dark:hover:bg-gray-700 dark:focus:ring-gray-600 duration-300 active:translate-y-0.5"
          onClick={() => {
            setUserMenu((prev) => !prev);
          }}>
          <span className="material-symbols-outlined">menu</span>
        </button>

        <button
          type="button"
          className="text-sm rounded-full md:me-0 dark:focus:ring-gray-600 duration-300 active:translate-y-0.5 "
          onClick={() => {
            setHeight(height === 0 ? "auto" : 0);
          }}>
          <img
            className="w-10 h-10 rounded-full"
            src="https://images.pexels.com/photos/26186220/pexels-photo-26186220/free-photo-of-a-man-standing-with-his-arms-crossed.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="user photo"
          />
        </button>
      </div>
      <div
        className={`w-full mt-4 z-50 md:my-1 list-none bg-white divide-y divide-gray-100 rounded-md shadow dark:bg-gray-700 dark:divide-gray-600 md:absolute top-full right-0 md:w-max overflow-hidden + ${
          height === 0 ? "opacity-0" : "opacity-100"
        }`}
        style={{ height: height, transition: "300ms ease-in-out" }}>
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            welcome onbord
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            welcome@PlanZen.com
          </span>
        </div>
        <ul className="p-2 w-full">
          {userLinks.map((items, index) => {
            return (
              <li key={index}>
                <NavLink
                  to={items.path}
                  className="rounded-md flex items-center justify-start gap-2 p-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  {items.icon}
                  {items.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
