import { useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import RoiStats from "components/vaultsReport/vaultOverview/apyStats";
import StrategyLink from "components/vaultsReport/vaultOverview/strategyLink";
import VaultLink from "components/vaultsReport/vaultOverview/vaultLink";

const useVaultLogoStyles = makeStyles((theme) => {
  return {
    [theme.breakpoints.down("xs")]: {
      root: {
        float: "right",
      },
    },
  };
});

function VaultOverview({ vault }) {
  const theme = useTheme();
  const direction = useMediaQuery(theme.breakpoints.down("xs")) ? "row-reverse" : "row";
  const vaultLogoClasses = useVaultLogoStyles();

  return (
    <Grid container direction={direction}>
      <Grid item xs={3} sm={1} md={2}>
        <img
          src={vault.tokenIcon}
          alt="Vault logo"
          className={vaultLogoClasses.root}
          width={48}
          height={48}
        />
      </Grid>
      <Grid container item xs={9} sm={11} md={10} justify="space-between">
        <Grid item>
          <VaultLink address={vault.address} linkText={vault.vaultAlias} titleText={vault.name} />
          <StrategyLink
            address={vault.strategyAddress}
            linkText={vault.strategyName}
            titleText={vault.strategyName}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={10}>
          <RoiStats vaultAddress={vault.address} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default VaultOverview;
