import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import { getCurrentThemeName } from "components/pageContainer/header/settingsPanel/selectors";
import SettingsPanelHeading from "components/pageContainer/header/settingsPanel/settingsPanelDraw/settingsPanelHeading";
import { actions } from "components/pageContainer/header/settingsPanel/slice";
import { useSelector, useDispatch } from "react-redux";
import { themeNames } from "theme/themes";

function ThemeSettings() {
  const dispatch = useDispatch();

  const handleThemeSelection = (themeName) => {
    dispatch(actions.themeSelected(themeName));
  };

  const currentTheme = useSelector(getCurrentThemeName);

  return (
    <Grid container>
      <Grid item xs={12}>
        <SettingsPanelHeading title="Theme settings" />
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel htmlFor="theme">Theme</InputLabel>
          <NativeSelect
            value={currentTheme}
            onChange={(event) => handleThemeSelection(event.target.value)}
            inputProps={{
              id: "theme",
            }}
          >
            {themeNames.map((themeName) => {
              return (
                <option key={themeName} value={themeName}>
                  {themeName}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default ThemeSettings;
