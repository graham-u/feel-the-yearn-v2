import { useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import StrategyLink from "components/vaultsReport/vaultOverview/strategyLink";
import VaultLink from "components/vaultsReport/vaultOverview/vaultLink";

const useVaultLogoStyles = makeStyles((theme) => {
  return {
    [theme.breakpoints.down("md")]: {
      root: {
        float: "right",
      },
    },
  };
});

function VaultOverview({ vault }) {
  const theme = useTheme();
  const direction = useMediaQuery(theme.breakpoints.down("md")) ? "row-reverse" : "row";
  const vaultLogoClasses = useVaultLogoStyles();

  return (
    <Grid container direction={direction}>
      <Grid item xs={2}>
        <img
          src={vault.tokenIcon}
          alt="Vault logo"
          className={vaultLogoClasses.root}
          width={48}
          height={48}
        />
      </Grid>
      <Grid item xs={10}>
        <VaultLink address={vault.address} linkText={vault.vaultAlias} titleText={vault.name} />
        <StrategyLink address={vault.strategyAddress} linkText={vault.strategyName} />
      </Grid>
    </Grid>
  );
}

export default VaultOverview;
