import React, { createContext } from "react";
import { ThemeProvider } from "@mui/material";

export const ThemeContext = createContext({});

import { light } from "../styles/Themes";

export default function SettingsProvider({ children }) {
  return (
    <ThemeContext.Provider>
      <ThemeProvider theme={light}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
