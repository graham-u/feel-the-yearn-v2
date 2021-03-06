import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useSelectWallet } from "components/connectionProvider/hooks";
import SettingsPanelHeading from "components/pageContainer/header/settingsPanel/settingsPanelDraw/settingsPanelHeading";
import { actions } from "components/pageContainer/header/settingsPanel/slice";
import { useDispatch } from "react-redux";

function WalletSettings() {
  const dispatch = useDispatch();
  const selectWallet = useSelectWallet();

  const showSelectWallet = () => {
    dispatch(actions.panelToggled());
    selectWallet();
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <SettingsPanelHeading title="Wallet" />
      </Grid>
      <Grid>
        <Button variant="outlined" color="default" size="small" onClick={showSelectWallet}>
          Select wallet
        </Button>
      </Grid>
    </Grid>
  );
}

export default WalletSettings;
