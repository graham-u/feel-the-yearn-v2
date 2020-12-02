import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { memoize } from "lodash";

const sharedThemeConfig = {
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
};

const redThemeLight = {
  ...sharedThemeConfig,
  palette: {
    type: "light",
    primary: {
      main: "#e56b73",
    },
    secondary: {
      main: "#DC6BE5",
    },
    text: {
      link: "#e56b73",
    },
  },
};

const redThemeDark = {
  ...sharedThemeConfig,
  palette: {
    type: "dark",
    primary: {
      main: "#e56b73",
    },
    secondary: {
      main: "#DC6BE5",
    },
    text: {
      link: "#e56b73",
    },
  },
};

const blueThemeLight = {
  ...sharedThemeConfig,
  palette: {
    type: "light",
    primary: {
      main: "hsl(210, 71%, 37%)",
    },
    secondary: {
      main: "#DC6BE5",
    },
    text: {
      link: "#095EB5",
    },
  },
};

const blueThemeDark = {
  ...sharedThemeConfig,
  palette: {
    type: "dark",
    primary: {
      main: "hsl(210, 71%, 37%)",
    },
    secondary: {
      main: "#DC6BE5",
    },
    text: {
      link: "#3e9feb",
    },
  },
};

const themes = {
  "Red (Light)": redThemeLight,
  "Red (Dark)": redThemeDark,
  "Blue (Light)": blueThemeLight,
  "Blue (Dark)": blueThemeDark,
};

const themeNames = Object.keys(themes);

const getTheme = memoize((themeName) => {
  return responsiveFontSizes(createMuiTheme(themes[themeName]));
});

export { themes, themeNames, getTheme };
