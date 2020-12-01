import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
import AnimatedNumber from "animated-number-react";

const defaultFormatter = (v) => v;
const defaultDuration = 1000;

const useLoadingStyles = makeStyles({
  root: { outline: "1px solid #dddddd" },
});

function AnimatedTicker({
  value,
  formatter = defaultFormatter,
  duration = defaultDuration,
  loading = false,
}) {
  const loadingClasses = useLoadingStyles(loading);

  const tooltipTitle = value ?? "No value yet";

  return (
    <Tooltip title={tooltipTitle} arrow>
      <Typography
        color={"textPrimary"}
        display="inline"
        className={loading ? loadingClasses.root : ""}
      >
        <AnimatedNumber value={value} duration={duration} formatValue={formatter} />
      </Typography>
    </Tooltip>
  );
}

export default AnimatedTicker;
