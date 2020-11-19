import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e56b73",
    },
    secondary: {
      main: "#DC6BE5",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
    fontSize: 12,

    h1: {
      fontSize: "4rem",
    },

    h2: {
      fontSize: "2rem",
    },

    body2: {
      fontSize: "0.9rem",
      fontFamily: "Monospace, Arial",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
