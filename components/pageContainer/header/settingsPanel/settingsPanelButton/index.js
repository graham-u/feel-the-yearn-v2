import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import { actions } from "components/pageContainer/header/settingsPanel/slice";
import { useDispatch } from "react-redux";

function SettingsPanelButton() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const dispatch = useDispatch();
  const togglePanel = () => {
    dispatch(actions.panelToggled());
  };

  return (
    <>
      {isXs ? (
        <IconButton color="inherit" edge={"end"} onClick={togglePanel}>
          <MenuIcon />
        </IconButton>
      ) : (
        <Button color={"inherit"} variant={"outlined"} onClick={togglePanel}>
          Settings
        </Button>
      )}
    </>
  );
}

export default SettingsPanelButton;
