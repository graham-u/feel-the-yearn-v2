import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import { getVaultSortField } from "components/pageContainer/header/settingsPanel/selectors";
import SettingsPanelHeading from "components/pageContainer/header/settingsPanel/settingsPanelDraw/settingsPanelHeading";
import { actions } from "components/pageContainer/header/settingsPanel/slice";
import { useDispatch, useSelector } from "react-redux";

const sortFields = [
  "Vault name",
  "APY (week based)",
  "APY (month based)",
  "APY (all time based)",
  "Vault holdings",
  "Strategy holdings",
  "User holdings",
  "Lifetime earnings",
];

function VaultSortSettings() {
  const dispatch = useDispatch();

  const handleVaultSortFieldSelection = (sortField) => {
    dispatch(actions.vaultSortFieldSelected(sortField));
  };

  const currentVaultSortFieldId = useSelector(getVaultSortField);

  return (
    <Grid container>
      <Grid item xs={12}>
        <SettingsPanelHeading title="Sort settings" />
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel htmlFor="vault-sort-by-field">Sort vaults by</InputLabel>
          <NativeSelect
            value={currentVaultSortFieldId}
            onChange={(event) => handleVaultSortFieldSelection(event.target.value)}
            inputProps={{
              id: "vault-sort-by-field",
            }}
          >
            {sortFields.map((sortField) => {
              return (
                <option key={sortField} value={sortField}>
                  {sortField}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default VaultSortSettings;
