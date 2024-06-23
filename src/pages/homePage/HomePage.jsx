import { NavLink, Outlet } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidData } from "react-icons/bi";
import { ImTarget } from "react-icons/im";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { MdLocalGroceryStore } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { useTheme } from "../../appContext/appContext";

export default function HomePage() {
  const [extendwidth, setExtendwidth] = useState(false);
  const { themeMode } = useTheme();

  const navElements = [
    {
      icon: <MdDashboard />,
      title: "Dashboard",
      path: "/Dashboard",
    },
    {
      icon: <RiCalendarScheduleFill />,
      title: "Schedules",
      path: "/Schedules",
    },
    {
      icon: <ImTarget />,
      title: "Habit Tracker",
      path: "/Habit",
    },
    {
      icon: <BiSolidData />,
      title: "My Budgets",
      path: "/Budget",
    },
    {
      icon: <MdLocalGroceryStore />,
      title: "Go Shopping",
      path: "/Shopping",
    },
    {
      icon: <IoIosChatboxes />,
      title: "Conversations",
      path: "/ChatPage",
    },
  ];

  return (
    <div className="w-full h-full flex rounded-md shadow-lg home--page-css">
      <nav className={`navigation + ${extendwidth ? "extend-css" : ""}`}>
        <div
          className={`flex items-center  gap-2  h-12  border-gray-600 text-xl px-2 + ${
            extendwidth
              ? "justify-center w-max"
              : "justify-start w-full border-b"
          }`}>
          <span
            onClick={() => {
              setExtendwidth((prev) => !prev);
            }}>
            <GiHamburgerMenu />
          </span>
        </div>
        <div className="w-full flex-1 flex flex-col items-start justify-center gap-2">
          {navElements.map((elements) => {
            return (
              <NavLink
                key={uuidv4()}
                to={elements.path}
                className={({ isActive }) =>
                  `flex items-center justify-start gap-2 h-11 w-full p-2 rounded-lg font-semibold duration-300 + ${
                    isActive && themeMode === "dark"
                      ? "bg-teal-50 text-black "
                      : isActive && themeMode === "light"
                      ? "bg-teal-950 text-white "
                      : !isActive && themeMode === "light"
                      ? "hover:bg-gray-50 text-black "
                      : "hover:bg-gray-900 text-white"
                  }
                  `
                }>
                <span className="text-xl">{elements.icon}</span>
                <span
                  className={`text-sm + ${!extendwidth ? "hidden" : "flex"}`}>
                  {elements.title}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
      <div className="home--page--outlet">
        <Outlet />
      </div>
    </div>
  );
}
