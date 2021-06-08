import Drawer from "@material-ui/core/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getSettingsPanelOpen } from "components/pageContainer/header/settingsPanel/selectors";
import CloseButton from "components/pageContainer/header/settingsPanel/settingsPanelDraw/closeButton";
import SettingContainer from "components/pageContainer/header/settingsPanel/settingsPanelDraw/settingContainer";
import ThemeSettings from "components/pageContainer/header/settingsPanel/settingsPanelDraw/themeSettings";
import VaultSortSettings from "components/pageContainer/header/settingsPanel/settingsPanelDraw/vaultSortSettings";
import VisibilitySettings from "components/pageContainer/header/settingsPanel/settingsPanelDraw/visibilitySettings";
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
          <SettingContainer>
            <WalletSettings />
          </SettingContainer>

          <SettingContainer>
            <VisibilitySettings />
          </SettingContainer>

          <SettingContainer>
            <VaultSortSettings />
          </SettingContainer>

          <SettingContainer>
            <ThemeSettings />
          </SettingContainer>
        </div>
      </aside>
    </Drawer>
  );
}

export default SettingsPanelDrawer;
