import { useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import StrategyLink from "components/vaultsReport/vaultOverview/strategyLink";
import VaultLink from "components/vaultsReport/vaultOverview/vaultLink";

function VaultOverview({ vault }) {
  const theme = useTheme();
  const direction = useMediaQuery(theme.breakpoints.down("md")) ? "row-reverse" : "row";

  return (
    <Grid container direction={direction}>
      <Grid item xs={2}>
        <img src={vault.tokenIcon} alt="Vault logo" width={48} height={48} />
      </Grid>
      <Grid item xs={10}>
        <VaultLink address={vault.address} linkText={vault.vaultAlias} titleText={vault.name} />
        <StrategyLink address={vault.strategyAddress} linkText={vault.strategyName} />
      </Grid>
    </Grid>
  );
}

export default VaultOverview;
