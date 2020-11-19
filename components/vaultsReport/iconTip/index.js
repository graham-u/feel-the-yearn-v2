import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

function IconTip({
  children,
  IconComponent = HelpOutlineIcon,
  color = "secondary",
  fontSize = "inherit",
}) {
  return (
    <Tooltip title={children} arrow>
      <IconComponent fontSize={fontSize} color={color} />
    </Tooltip>
  );
}

export default IconTip;
