/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
  widthInput: 0,
  onWidthExtend: () => {},
});

export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => {
  return useContext(ThemeContext);
};
