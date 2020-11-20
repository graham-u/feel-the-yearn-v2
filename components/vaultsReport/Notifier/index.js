import { Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { useState } from "react";
import { useSelector } from "react-redux";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

function Notifier({ shouldShowSelector, message, severity = "info" }) {
  const [open, setOpen] = useState(false);
  const [previouslyClosed, setPreviouslyClosed] = useState(false);
  const shouldShow = useSelector(shouldShowSelector);

  if (shouldShow && !previouslyClosed && !open) {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setPreviouslyClosed(true);
  };

  return (
    <Snackbar open={open}>
      <Alert onClose={handleClose} severity={severity}>
        <AlertTitle>{capitalizeFirstLetter(severity)}</AlertTitle>
        <Typography>{message}</Typography>
      </Alert>
    </Snackbar>
  );
}

export default Notifier;
