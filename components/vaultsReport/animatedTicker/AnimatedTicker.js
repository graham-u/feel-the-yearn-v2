import { Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AnimatedNumber from "animated-number-react";

const defaultFormatter = (v) => v;
const defaultDuration = 1000;

function AnimatedTicker({ value, formatter = defaultFormatter, duration = defaultDuration }) {
  return (
    <Tooltip title={value} arrow>
      <Typography display="inline">
        <AnimatedNumber value={value} duration={duration} formatValue={formatter} />
      </Typography>
    </Tooltip>
  );
}

export default AnimatedTicker;
