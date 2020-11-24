import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SettingsPanel from "components/pageContainer/header/settingsPanel";

const useAppBarStyles = makeStyles({
  root: {
    padding: "1rem",
    marginBottom: "2rem",
  },
});

function Header() {
  const appBarClasses = useAppBarStyles();

  return (
    <AppBar position="static" classes={{ root: appBarClasses.root }}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography component="h1" variant="h4" display="inline" gutterBottom>
            Feel the Yearn
          </Typography>
          <Link
            href="https://old.feel-the-yearn.app/vaults"
            title="Visit original site (for limited time)"
            variant="subtitle1"
            color="inherit"
            display="block"
          >
            Old site
          </Link>
        </Grid>
        <Grid item>
          <SettingsPanel />
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Header;
