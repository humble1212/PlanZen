// src/layouts/Layout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "../../appContext/appContext";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Toastify from "../../Notifications/Toastify";
import authService from "../../appwrite/Auth";
import { login, logout } from "../../redux/slices/authSlice";

const Layout = () => {
  const [themeMode, setThemeMode] = useState(() => {
    // Initialize theme from localStorage or default to 'light'
    return localStorage.getItem("themeMode") || "light";
  });

  const [widthInput, setWidthInput] = useState(0);

  const onWidthExtend = () => {
    setWidthInput(widthInput === 0 ? "40%" : 0);
  };

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  // Effect to update localStorage and apply theme class when themeMode changes
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check for authentication
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
        navigate("/");
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch, navigate]);

  return (
    <ThemeProvider
      value={{
        themeMode,
        darkTheme,
        lightTheme,
        widthInput,
        onWidthExtend,
      }}>
      <main
        className={`w-screen h-screen flex items-center justify-center p-1 + ${
          themeMode === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-900"
        }`}>
        <Sidebar />
        <section className="flex-1 flex flex-col h-full items-center justify-between p-1">
          <Header />
          <div className="w-full h-full items-center justify-center overflow-scroll">
            <Outlet />
          </div>
        </section>
        <Toastify />
      </main>
    </ThemeProvider>
  );
};

export default Layout;
