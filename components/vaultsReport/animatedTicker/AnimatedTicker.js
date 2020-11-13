import AnimatedNumber from "animated-number-react";

const defaultFormatter = (v) => v;
const defaultDuration = 1000;

function AnimatedTicker({
  value,
  formatter = defaultFormatter,
  duration = defaultDuration,
}) {
  return (
    <AnimatedNumber value={value} duration={duration} formatValue={formatter} />
  );
}

export default AnimatedTicker;
