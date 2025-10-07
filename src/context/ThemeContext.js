"use client";
import { createContext } from "react";
import { useState } from "react";

const MyContext = createContext();

function ThemeProvider({ children }) {
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState("light");

  const values = {
    user,
    setUser,
    theme,
    setTheme,
  };

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>;
}

export default ThemeProvider;
