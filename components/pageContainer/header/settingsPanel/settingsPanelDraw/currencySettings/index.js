import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import SettingsPanelHeading from "components/pageContainer/header/settingsPanel/settingsPanelDraw/settingsPanelHeading";
import { getLocalCurrency } from "components/pageContainer/header/settingsPanel/selectors";
import { actions } from "components/pageContainer/header/settingsPanel/slice";
import { useSelector, useDispatch } from "react-redux";
import { fiatCurrencyCodes } from "siteConfig";

function CurrencySettings() {
  const dispatch = useDispatch();

  const handleCurrencySelection = (currencyCode) => {
    dispatch(actions.panelToggled());
    dispatch(actions.localCurrencySelected(currencyCode));
  };

  const localCurrency = useSelector(getLocalCurrency);

  return (
    <Grid container>
      <Grid item xs={12}>
        <SettingsPanelHeading title="Currency settings" />
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel htmlFor="currency">Local currency</InputLabel>
          <NativeSelect
            value={localCurrency}
            onChange={(event) => handleCurrencySelection(event.target.value)}
            inputProps={{
              id: "currency",
            }}
          >
            {fiatCurrencyCodes.map((currencyCode) => {
              return (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode}
                </option>
              );
            })}
          </NativeSelect>
          <FormHelperText>Fiat currency in which to show holdings</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default CurrencySettings;
