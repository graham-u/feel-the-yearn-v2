import Drawer from "@material-ui/core/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseButton from "components/pageContainer/header/settingsPanel/settingsPanelDraw/closeButton";
import CurrencySettings from "components/pageContainer/header/settingsPanel/settingsPanelDraw/currencySettings";
import WalletSettings from "components/pageContainer/header/settingsPanel/settingsPanelDraw/walletSettings";
import { getSettingsPanelOpen } from "components/pageContainer/header/settingsPanel/selectors";
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
        </div>
      </aside>
    </Drawer>
  );
}

export default SettingsPanelDrawer;
