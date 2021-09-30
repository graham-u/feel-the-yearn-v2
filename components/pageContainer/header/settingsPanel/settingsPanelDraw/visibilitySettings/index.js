import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import { getVaultVisibilitySetting } from "components/pageContainer/header/settingsPanel/selectors";
import SettingsPanelHeading from "components/pageContainer/header/settingsPanel/settingsPanelDraw/settingsPanelHeading";
import { actions } from "components/pageContainer/header/settingsPanel/slice";
import { map } from "lodash";
import { useSelector, useDispatch } from "react-redux";

const visibilityOptions = {
  allVaults: "All",
  currentDeposits: "Current deposits",
  allDeposits: "All historical deposits",
};

function VisibilitySettings() {
  const dispatch = useDispatch();

  const handleVisibilitySelection = (visibilityOption) => {
    dispatch(actions.vaultVisibilitySelected(visibilityOption));
  };

  const currentVisibilitySetting = useSelector(getVaultVisibilitySetting);

  return (
    <Grid container>
      <Grid item xs={12}>
        <SettingsPanelHeading title="Visibility settings" />
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel htmlFor="theme">Show vaults by</InputLabel>
          <NativeSelect
            value={currentVisibilitySetting}
            onChange={(event) => handleVisibilitySelection(event.target.value)}
            inputProps={{
              id: "visibility",
            }}
          >
            {map(visibilityOptions, (label, key) => {
              return (
                <option key={key} value={key}>
                  {label}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default VisibilitySettings;
