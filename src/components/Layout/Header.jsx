/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { MdDarkMode, MdOutlineDarkMode, MdMenu, MdClose } from "react-icons/md";
import { useTheme } from "../../appContext/appContext";
import { logout } from "../../redux/slices/authSlice";
import authService from "../../appwrite/Auth";
import Toastify from "../../Notifications/Toastify";
import { BiUser } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userData = useSelector((state) => state.auth.userData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { themeMode, darkTheme, lightTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    authService.logoutUser().then(() => {
      dispatch(logout());
      Toastify.success("Logged out successfully!");
    });
  };

  const toggleTheme = () => {
    themeMode === "light" ? darkTheme() : lightTheme();
  };

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block py-2 px-4 text-sm font-semibold ${
          isActive ? "text-blue-600" : ""
        } hover:text-blue-600 transition-colors duration-200`
      }>
      {children}
    </NavLink>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`w-full bg-black z-50 transition-all duration-300 ${
        scrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4 py-3  mb-1">
        <div className="flex items-center justify-between">
          <nav className="hidden md:flex-1 md:flex items-center justify-center space-x-4">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/Support">Support Us</NavItem>
            <NavItem to="/LocateUs">Locate Us</NavItem>
            <NavItem to="/About">About</NavItem>
            <NavItem to="/Contact">Contact</NavItem>
          </nav>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors duration-300 ${
                themeMode === "light"
                  ? "hover:bg-gray-200"
                  : "hover:bg-gray-700"
              }`}>
              {themeMode === "light" ? (
                <MdOutlineDarkMode className="w-5 h-5" />
              ) : (
                <MdDarkMode className="w-5 h-5 text-yellow-400" />
              )}
            </motion.button>

            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2">
                  <img
                    src={
                      userData.profileImage ||
                      "https://images.pexels.com/users/avatars/677920507/christopher-eshun-732.jpg?auto=compress&fit=crop&h=130&w=130&dpr=1"
                    }
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden md:inline font-semibold text-sm">
                    {userData.name || userData.prefs.name}
                  </span>
                </motion.button>
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-48 p-2 ${
                        themeMode === "light" ? "bg-white" : "bg-gray-800"
                      } rounded-md shadow-lg py-1 z-10`}>
                      <NavLink
                        to="/Profile"
                        className="flex items-center justify-start gap-3 border-b h-9 p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                        <BiUser /> Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-start gap-3 h-9 p-2 w-full text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <LuLogOut /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <NavLink
                    to="/Login"
                    className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200">
                    Login
                  </NavLink>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <NavLink
                    to="/Register"
                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200">
                    Sign up
                  </NavLink>
                </motion.div>
              </div>
            )}

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
              {isMenuOpen ? (
                <MdClose className="w-6 h-6" />
              ) : (
                <MdMenu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 md:hidden">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/Donate">Support Us</NavItem>
              <NavItem to="/Location">Locate Us</NavItem>
              <NavItem to="/About">About</NavItem>
              <NavItem to="/ContactUs">Contact</NavItem>
              {!isAuthenticated && (
                <div className="mt-4 space-y-2">
                  <NavLink
                    to="/Login"
                    className="block w-full px-4 py-2 text-sm font-semibold text-center text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200">
                    Login
                  </NavLink>
                  <NavLink
                    to="/Register"
                    className="block w-full px-4 py-2 text-sm font-semibold text-center text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-200">
                    Sign up
                  </NavLink>
                </div>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
