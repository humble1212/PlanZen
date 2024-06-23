import { Outlet } from "react-router-dom";
import Header from "./pages/components/Header";
import Footer from "./pages/components/Footer";
import { ThemeProvider } from "./appContext/appContext";
import { useEffect, useState } from "react";

export default function Layout() {
  const [themeMode, setThemeMode] = useState("light");

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

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <main
        className={`w-screen h-ltH md:w-ltW flex flex-col rounded-md p-1 backdrop-blur-xl layout-css border border-gray-500`}>
        <Header />
        <section className="outlet-css ">
          <Outlet />
        </section>
        <Footer />
      </main>
    </ThemeProvider>
  );
}
