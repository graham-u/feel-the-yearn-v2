import { Typography } from "@material-ui/core";
import AnimatedNumber from "animated-number-react";

const defaultFormatter = (v) => v;
const defaultDuration = 1000;

function AnimatedTicker({ value, formatter = defaultFormatter, duration = defaultDuration }) {
  return (
    <Typography display="inline">
      <AnimatedNumber value={value} duration={duration} formatValue={formatter} />
    </Typography>
  );
}

export default AnimatedTicker;
