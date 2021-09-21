import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { actions } from "components/pageContainer/header/settingsPanel/slice";
import { useDispatch } from "react-redux";

function CloseButton() {
  const dispatch = useDispatch();

  const togglePanel = () => {
    dispatch(actions.panelToggled());
  };

  return (
    <Grid container justifyContent="flex-end">
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
  );
}

export default CloseButton;
