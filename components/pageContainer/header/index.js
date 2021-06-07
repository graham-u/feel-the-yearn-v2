import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import InternalLink from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SettingsPanel from "components/pageContainer/header/settingsPanel";

const useAppBarStyles = makeStyles({
  root: {
    padding: "1rem",
    marginBottom: "2rem",
  },
});

const useLinkStyles = makeStyles({
  root: {
    paddingRight: "1rem",
    cursor: "pointer",
  },
});
function Header() {
  const appBarClasses = useAppBarStyles();
  const linkClasses = useLinkStyles();

  return (
    <AppBar position="static" classes={{ root: appBarClasses.root }}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography component="h1" variant="h4" display="inline" gutterBottom>
            Feel the Yearn
          </Typography>
          <div>
            <InternalLink href="/vaults">
              <Link
                title="Yearn vaults"
                className={linkClasses.root}
                variant="subtitle1"
                color="inherit"
                display="inline"
              >
                Vaults
              </Link>
            </InternalLink>
            <InternalLink href="/about">
              <Link
                title="About this site"
                className={linkClasses.root}
                variant="subtitle1"
                color="inherit"
                display="inline"
              >
                About
              </Link>
            </InternalLink>
            <Link
              className={linkClasses.root}
              href="https://feel-the-yearn.app/vaults"
              title="Visit original site"
              variant="subtitle1"
              color="inherit"
              display="inline"
            >
              Original site
            </Link>
            <Link
              className={linkClasses.root}
              href="https://gitcoin.co/grants/1069/feel-the-yearn"
              title="Donate to my gitcoin grant"
              variant="subtitle1"
              color="inherit"
              display="inline"
            >
              Support me!
            </Link>
          </div>
        </Grid>
        <Grid item>
          <SettingsPanel />
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Header;
