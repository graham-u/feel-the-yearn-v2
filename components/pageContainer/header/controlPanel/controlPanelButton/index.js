import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";
import { actions } from "components/pageContainer/header/controlPanel/slice";
import { useDispatch } from "react-redux";

function ControlPanelButton() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const dispatch = useDispatch();

  return (
    <IconButton color="inherit" onClick={() => dispatch(actions.panelToggled())} edge={"end"}>
      {isXs ? (
        <MenuIcon />
      ) : (
        <Button variant={"outlined"} color={"inherit"}>
          Settings
        </Button>
      )}
    </IconButton>
  );
}

export default ControlPanelButton;
