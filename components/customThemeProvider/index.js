import { ThemeProvider } from "@material-ui/core/styles";
import { getCurrentThemeName } from "components/pageContainer/header/settingsPanel/selectors";
import { useSelector } from "react-redux";
import { getTheme } from "theme/themes";

function CustomThemeProvider({ children }) {
  const currentThemeName = useSelector(getCurrentThemeName);
  const theme = getTheme(currentThemeName);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export { CustomThemeProvider };
