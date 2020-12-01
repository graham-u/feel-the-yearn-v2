import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

function IconTip({
  children,
  IconComponent = HelpOutlineIcon,
  color = "secondary",
  fontSize = "inherit",
}) {
  return (
    <Tooltip title={children} enterTouchDelay={0} leaveTouchDelay={2500} arrow>
      <IconComponent fontSize={fontSize} color={color} />
    </Tooltip>
  );
}

export default IconTip;
