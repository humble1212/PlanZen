import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { TbMessageCircle2 } from "react-icons/tb";
import { useTheme } from "../../appContext/appContext";

export default function Footer() {
  const [toggleOn, setToggleOn] = useState(false);

  const { darkTheme, lightTheme } = useTheme();

  return (
    <footer className="h-20 w-full flex items-center justify-center gap-2 rounded-md dark:bg-gray-900 dark:text-white p-2">
      <header className=" w-full h-auto flex items-center justify-center border-b border-gray-400">
        <div className="flex-1 flex flex-col items-start justify-start">
          <p className="text-lg font-bold">welcome</p>
          <h1 className="text-md font-bold">Mr. Christopher</h1>
        </div>
        <div className="flex-1 flex items-center justify-end gap-2">
          <form className="w-max flex items-center justify-center gap-1 border rounded-full px-2">
            <input
              type="search"
              className="w-max p-2 bg-inherit focus:outline-none capitalize rounded-lg text-sm"
              placeholder="search..."
            />
            <button
              type="submit"
              className=" p-2 rounded-full active:translate-y-0.5 hover:bg-gray-200 hover:text-black w-8 h-8 flex items-center justify-center duration-300">
              <FaSearch />
            </button>
          </form>
          <button
            type="button"
            className="text-black duration-300 bg-gray-300 w-8 h-8 hover:bg-gray-200 hover:text-black rounded-full flex items-center justify-center active:translate-y-0.5">
            <TbMessageCircle2 />
          </button>
          <button
            type="button"
            className="text-black duration-300 bg-gray-300 w-8 h-8 hover:bg-gray-200 hover:text-black rounded-full flex items-center justify-center active:translate-y-0.5"
            onClick={() => {
              setToggleOn((prev) => !prev);
            }}>
            <span>
              {toggleOn ? (
                <MdDarkMode className="w-5 h-5" onClick={lightTheme} />
              ) : (
                <MdOutlineDarkMode className="w-5 h-5" onClick={darkTheme} />
              )}
            </span>
          </button>
        </div>
      </header>
    </footer>
  );
}
