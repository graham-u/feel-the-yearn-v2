import { useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { getVaultIcon } from "components/vaultsReport/selectors";
import RoiStats from "components/vaultsReport/vault/vaultOverview/apyStats";
import VaultLink from "components/vaultsReport/vault/vaultOverview/vaultLink";
import ReactImageFallback from "react-image-fallback";
import { useSelector } from "react-redux";

const useVaultLogoStyles = makeStyles((theme) => {
  const styles = {
    [theme.breakpoints.down("xs")]: {
      root: {
        float: "right",
      },
    },
  };

  if (!theme.vaults.showIcons) {
    styles.root = {
      display: "none",
    };
  }

  return styles;
});

const useVaultDetailsStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: "0.4rem",
    },
  };
});

const fallBackIcon = <HelpOutlineOutlinedIcon style={{ fontSize: 48 }} />;

function VaultOverview({ vault }) {
  const theme = useTheme();
  const direction = useMediaQuery(theme.breakpoints.down("xs")) ? "row-reverse" : "row";
  const vaultLogoClasses = useVaultLogoStyles();
  const vaultDetailsClasses = useVaultDetailsStyles();
  const vaultIcon = useSelector((state) => getVaultIcon(state, vault.token));

  return (
    <Grid container direction={direction}>
      <Grid item xs={3} sm={1} md={2}>
        <ReactImageFallback
          src={vaultIcon}
          fallbackImage={fallBackIcon}
          alt="Vault logo"
          className={vaultLogoClasses.root}
          width={48}
          height={48}
        />
      </Grid>
      <Grid container item xs={9} sm={11} md={10} justify="space-between">
        <Grid item className={vaultDetailsClasses.root}>
          <VaultLink address={vault.address} linkText={vault.name} titleText={vault.symbol} />
        </Grid>
        <Grid item xs={12} sm={5} md={10}>
          <RoiStats APYData={vault.metadata.apy} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VaultOverview;
