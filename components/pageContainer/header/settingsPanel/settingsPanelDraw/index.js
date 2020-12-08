import Drawer from "@material-ui/core/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getSettingsPanelOpen } from "components/pageContainer/header/settingsPanel/selectors";
import CloseButton from "components/pageContainer/header/settingsPanel/settingsPanelDraw/closeButton";
import CurrencySettings from "components/pageContainer/header/settingsPanel/settingsPanelDraw/currencySettings";
import ThemeSettings from "components/pageContainer/header/settingsPanel/settingsPanelDraw/themeSettings";
import VaultSortSettings from "components/pageContainer/header/settingsPanel/settingsPanelDraw/vaultSortSettings";
import WalletSettings from "components/pageContainer/header/settingsPanel/settingsPanelDraw/walletSettings";
import { useSelector } from "react-redux";

const useDrawerContentStyles = makeStyles({
  root: {
    width: "300px",
    padding: "1rem",
  },
});

function SettingsPanelDrawer() {
  const panelOpen = useSelector(getSettingsPanelOpen);
  const drawerContentClasses = useDrawerContentStyles();

  return (
    <Drawer variant="persistent" anchor={"right"} open={panelOpen}>
      <aside>
        <div className={drawerContentClasses.root}>
          <CloseButton />
          <WalletSettings />
          <CurrencySettings />
          <ThemeSettings />
          <VaultSortSettings />
        </div>
      </aside>
    </Drawer>
  );
}

export default SettingsPanelDrawer;
