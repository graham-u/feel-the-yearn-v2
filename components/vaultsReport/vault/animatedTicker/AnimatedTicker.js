import { Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AnimatedNumber from "animated-number-react";

const defaultFormatter = (v) => v;
const defaultDuration = 1000;

function AnimatedTicker({ value, formatter = defaultFormatter, duration = defaultDuration }) {
  const tooltipTitle = value ?? "No value yet";

  return (
    <Tooltip title={tooltipTitle} arrow>
      <Typography color={"textPrimary"} display="inline">
        <AnimatedNumber value={value} duration={duration} formatValue={formatter} />
      </Typography>
    </Tooltip>
  );
}

export default AnimatedTicker;
