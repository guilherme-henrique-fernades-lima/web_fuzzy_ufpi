import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*, *::before, *::after, #root": {
        fontFamily: "Montserrat, sans-serif",
        textDecoration: "none",
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      body: {
        display: "flex",
        height: "100%",
        width: "100%",
        //backgroundColor: "#F6F6F7",
        overflowX: "hidden",
      },
      html: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
