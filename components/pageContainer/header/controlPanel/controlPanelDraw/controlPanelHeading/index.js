import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useHeadingStyles = makeStyles({
  root: {
    marginBottom: "0.25rem",
    marginTop: "1rem",
  },
});

function ControlPanelHeading({ title }) {
  const headingStyles = useHeadingStyles();

  return (
    <div className={headingStyles.root}>
      <Typography component="h2" variant={"h6"}>
        {title}
      </Typography>
      <Divider />
    </div>
  );
}

export default ControlPanelHeading;
