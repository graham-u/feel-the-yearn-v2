import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useSelectWallet } from "components/connectionProvider/hooks";
import ControlPanelHeading from "components/pageContainer/header/controlPanel/controlPanelDraw/controlPanelHeading";
import { getControlPanelOpen } from "components/pageContainer/header/controlPanel/selectors";
import { actions } from "components/pageContainer/header/controlPanel/slice";
import { useSelector, useDispatch } from "react-redux";

const useDrawerContentStyles = makeStyles({
  root: {
    width: "300px",
    padding: "1rem",
  },
});

function ControlPanelDrawer() {
  const selectWallet = useSelectWallet();
  const panelOpen = useSelector(getControlPanelOpen);
  const drawerContentClasses = useDrawerContentStyles();

  const dispatch = useDispatch();

  const togglePanel = () => {
    dispatch(actions.panelToggled());
  };

  const showSelectWallet = () => {
    togglePanel();
    selectWallet();
  };

  return (
    <Drawer variant="persistent" anchor={"right"} open={panelOpen}>
      <aside>
        <div className={drawerContentClasses.root}>
          <Grid container justify="flex-end">
            <Grid item>
              <IconButton
                size="small"
                disableFocusRipple
                disableRipple
                onClick={togglePanel}
                edge={"end"}
              >
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justify="flex-start">
            <Grid item xs={12}>
              <ControlPanelHeading title="Wallet" />
            </Grid>
            <Grid>
              <Button variant="outlined" color="default" size="small" onClick={showSelectWallet}>
                Select wallet
              </Button>
            </Grid>
          </Grid>
        </div>
      </aside>
    </Drawer>
  );
}

export default ControlPanelDrawer;
