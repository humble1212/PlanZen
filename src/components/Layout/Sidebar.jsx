/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../appContext/appContext";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/Auth";
import { logout } from "../../redux/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdLightMode,
  MdDarkMode,
  MdChevronLeft,
  MdChevronRight,
  MdLogout,
  MdDashboard,
  MdCheckCircle,
  MdChat,
  MdCalendarToday,
  MdShoppingCart,
  MdAttachMoney,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import { toast } from "react-toastify";

const featureItems = [
  { to: "/Dashboard", icon: MdDashboard, label: "Dashboard" },
  { to: "/calendar", icon: MdCalendarToday, label: "Schedules" },
  { to: "/HabitTracker", icon: MdCheckCircle, label: "Habit Tracker" },
  { to: "/budget", icon: MdAttachMoney, label: "My Budget" },
  { to: "/shopping", icon: MdShoppingCart, label: "Go for Shopping" },
  { to: "/chat", icon: MdChat, label: "Conversations" },
];

const userItems = [
  { to: "/profile", icon: MdPerson, label: "Profile" },
  { to: "/settings", icon: MdSettings, label: "Settings" },
];

export default function Sidebar() {
  const { themeMode, darkTheme, lightTheme } = useTheme();
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogout = () => {
    authService.logoutUser().then(() => {
      dispatch(logout());
      toast.success("Logged out successfully!");
    });
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const sidebarVariants = {
    expanded: { width: "250px" },
    collapsed: { width: "80px" },
  };

  const NavItem = ({ to, icon: Icon, label }) => (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center px-4 py-3 my-1 transition-all duration-200 rounded-lg ${
            isActive
              ? themeMode === "dark"
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
              : themeMode === "light"
              ? "hover:bg-gray-100 text-gray-700 hover:text-indigo-600"
              : "hover:bg-gray-800 text-gray-300 hover:text-white"
          }`
        }>
        <Icon className={`h-6 w-6 ${isExpanded ? "mr-3" : "mx-auto"}`} />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              className="font-medium text-sm"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}>
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </NavLink>
    </motion.li>
  );

  return (
    <div className="relative h-full">
      <motion.nav
        className={`h-full shadow-xl flex flex-col py-4 ${
          themeMode === "light" ? "bg-white" : "bg-gray-900"
        } ${isExpanded ? "px-4" : "px-2"}`}
        initial="expanded"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}>
        <div className="flex items-center mb-8">
          <AnimatePresence>
            {isExpanded && (
              <motion.h1
                className="text-2xl font-bold tracking-tight ml-3 text-blue-600"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}>
                PlanZen
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        <div className="flex-grow overflow-y-auto">
          <AnimatePresence>
            {isExpanded && (
              <motion.h2
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
                Features
              </motion.h2>
            )}
          </AnimatePresence>
          <ul className="space-y-1">
            {featureItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <AnimatePresence>
            {isExpanded && (
              <motion.h2
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}>
                User
              </motion.h2>
            )}
          </AnimatePresence>
          <ul className="space-y-1 mb-4">
            {userItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </ul>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center rounded-lg ${
              themeMode === "light"
                ? "hover:bg-red-100 text-red-600"
                : "hover:bg-red-900 text-red-300"
            }`}>
            <MdLogout
              className={`h-6 w-6 ${isExpanded ? "mr-3" : "mx-auto"}`}
            />
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  className="font-medium text-sm"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}>
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (themeMode === "light" ? darkTheme() : lightTheme())}
            className={`w-full px-4 py-3 mt-2 text-left transition-all duration-200 flex items-center rounded-lg ${
              themeMode === "light"
                ? "hover:bg-gray-100 text-gray-700"
                : "hover:bg-gray-800 text-gray-300"
            }`}>
            {themeMode === "light" ? (
              <MdDarkMode
                className={`h-6 w-6 ${isExpanded ? "mr-3" : "mx-auto"}`}
              />
            ) : (
              <MdLightMode
                className={`h-6 w-6 ${isExpanded ? "mr-3" : "mx-auto"}`}
              />
            )}
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  className="font-medium text-sm"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}>
                  {themeMode === "light" ? "Dark Mode" : "Light Mode"}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
        className={`absolute top-4 -right-4 p-2 rounded-full shadow-md transition-colors duration-200 ${
          themeMode === "light"
            ? "bg-white hover:bg-gray-100 text-gray-600"
            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
        }`}>
        {isExpanded ? (
          <MdChevronLeft size={24} />
        ) : (
          <MdChevronRight size={24} />
        )}
      </motion.button>
    </div>
  );
}
