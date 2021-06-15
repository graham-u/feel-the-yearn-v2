import { useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import { getVaultIcon } from "components/vaultsReport/selectors";
import VaultHoldings from "components/vaultsReport/vault/vaultHoldings";
import RoiStats from "components/vaultsReport/vault/vaultOverview/apyStats";
import VaultLink from "components/vaultsReport/vault/vaultOverview/vaultLink";
import ReactImageFallback from "react-image-fallback";
import { useSelector } from "react-redux";

const useVaultLogoStyles = makeStyles((theme) => {
  const styles = {
    root: {
      verticalAlign: "middle",
      marginRight: "0.25rem",
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
  const vaultLogoClasses = useVaultLogoStyles();
  const vaultDetailsClasses = useVaultDetailsStyles();
  const vaultIcon = useSelector((state) => getVaultIcon(state, vault.token));
  const vaultIconSize = useMediaQuery(theme.breakpoints.down("sm")) ? 24 : 36;

  return (
    <Grid container spacing={1}>
      <Grid item className={vaultDetailsClasses.root}>
        <ReactImageFallback
          src={vaultIcon}
          fallbackImage={fallBackIcon}
          alt="Vault logo"
          className={vaultLogoClasses.root}
          width={vaultIconSize}
          height={vaultIconSize}
        />
        <VaultLink address={vault.address} linkText={vault.name} titleText={vault.symbol} />
      </Grid>
      <Grid item xs={12}>
        <VaultHoldings vaultAddress={vault.address} />
      </Grid>
      <Grid item xs={12}>
        <RoiStats APYData={vault.metadata.apy} />
      </Grid>
    </Grid>
  );
}

export default VaultOverview;
