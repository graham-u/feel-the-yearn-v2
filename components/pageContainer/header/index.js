import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelectWallet } from "components/connectionProvider/hooks";
import { getDrizzleInitialized } from "components/drizzleCreator/selectors";
import PageAwareLink from "components/pageContainer/header/pageAwareLink";
import { useSelector } from "react-redux";

const useAppBarStyles = makeStyles({
  root: {
    paddingLeft: "1em",
    paddingRight: "1em",
    paddingTop: "0.5em",
    marginBottom: "2rem",
  },
});

const useNavStyles = makeStyles((theme) => {
  return {
    list: {
      listStyle: "none",
      paddingLeft: 0,
    },
    listItem: {
      display: "inline-block",
      paddingRight: "2rem",
      "& a": {
        color: theme.palette.secondary.main,
      },
      fontSize: "1.2em",
    },
  };
});

function Header() {
  const drizzleInitialized = useSelector(getDrizzleInitialized);
  const selectWallet = useSelectWallet();

  const appBarClasses = useAppBarStyles();
  const navClasses = useNavStyles();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <AppBar position="static" classes={{ root: appBarClasses.root }}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography
            component="h1"
            variant={isXs ? "h5" : "h4"}
            display="inline"
            gutterBottom
          >
            Feel the Yearn
          </Typography>
        </Grid>
        <Grid item>
          {!drizzleInitialized && (
            <Button
              variant="outlined"
              size={isXs ? "small" : "large"}
              color="secondary"
              onClick={selectWallet}
            >
              Select wallet
            </Button>
          )}
        </Grid>
      </Grid>

      <ul className={navClasses.list}>
        <li className={navClasses.listItem}>
          <PageAwareLink href={"/vaults"}>
            <a>Vaults</a>
          </PageAwareLink>
        </li>
        <li className={navClasses.listItem}>
          <PageAwareLink href={"/governance"}>
            <a>Governance</a>
          </PageAwareLink>
        </li>
      </ul>
    </AppBar>
  );
}

export default Header;
