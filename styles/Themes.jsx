import { createTheme } from "@mui/material";

export const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#19191A",
    },
  },
  typography: {
    //fontFamily: "Nunito, sans-serif",
    //fontFamily: "Open Sans, sans-serif",
    fontFamily: "Montserrat, sans-serif",
  },
});

export const dark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#19191A",
    },
  },
});
