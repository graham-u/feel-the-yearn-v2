import Drawer from "@material-ui/core/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseButton from "components/pageContainer/header/controlPanel/controlPanelDraw/closeButton";
import CurrencySettings from "components/pageContainer/header/controlPanel/controlPanelDraw/currencySettings";
import WalletSettings from "components/pageContainer/header/controlPanel/controlPanelDraw/walletSettings";
import { selectors } from "components/pageContainer/header/controlPanel/slice";
import { useSelector } from "react-redux";

const useDrawerContentStyles = makeStyles({
  root: {
    width: "300px",
    padding: "1rem",
  },
});

function ControlPanelDrawer() {
  const panelOpen = useSelector(selectors.getControlPanelOpen);
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

export default ControlPanelDrawer;
