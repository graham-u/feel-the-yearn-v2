import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { memoize } from "lodash";

const sharedThemeConfig = {
  vaults: {
    showIcons: true,
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

const matrixTheme = {
  ...sharedThemeConfig,
  container: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), fixed url('/matrix.gif') center/cover",
  },
  vaults: {
    showIcons: false,
  },
  palette: {
    type: "dark",
    background: {
      default: "#000",
      paper: "#000B",
    },
    primary: {
      main: "#000A",
      contrastText: "#80ce87",
    },
    secondary: {
      main: "#22b455",
    },
    text: {
      primary: "#80ce87",
      secondary: "#92e5a1",
      link: "#80ce87",
      hint: "#204829",
    },
  },
};

const themes = {
  "Red (Light)": redThemeLight,
  "Red (Dark)": redThemeDark,
  "Blue (Light)": blueThemeLight,
  "Blue (Dark)": blueThemeDark,
  "The Matrix (Dark)": matrixTheme,
};

const themeNames = Object.keys(themes);

const getTheme = memoize((themeName) => {
  return responsiveFontSizes(createMuiTheme(themes[themeName]));
});

export { themes, themeNames, getTheme };
