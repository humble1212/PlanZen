// src/components/layout/Layout.jsx

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "../../appContext/appContext";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../redux/actions/authActions";

const Layout = () => {
  const [themeMode, setThemeMode] = useState("light");
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
  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(themeMode);
  }, [themeMode]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
    navigate("/");
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
      <main className="app-layout w-screen h-screen p-2 flex flex-col">
        <>
          <Header />
        </>
        <section className="main-content w-full flex-1 flex items-center justify-center">
          <nav className="w-64 h-full flex flex-col items-start justify-center pr-2 border-r border-gray-500">
            <Sidebar />
          </nav>
          <section className="flex-1 h-full flex p-1 items-center justify-center">
            <Outlet />
          </section>
        </section>
        <>
          <Footer />
        </>
      </main>
    </ThemeProvider>
  );
};

export default Layout;
