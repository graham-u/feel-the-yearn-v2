import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e56b73",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",

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

export default theme;
