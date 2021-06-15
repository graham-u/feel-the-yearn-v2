import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getVault } from "components/vaultsReport/getVaultSelector";
import StrategyHoldings from "components/vaultsReport/vault/strategyHoldings";
import UserEarnings from "components/vaultsReport/vault/userEarnings";
import UserHoldings from "components/vaultsReport/vault/userHoldings";
import VaultOverview from "components/vaultsReport/vault/vaultOverview";
import { useSelector } from "react-redux";

const layout = {
  vaultData: {
    width: 4,
  },
  strategyData: {
    width: 5,
  },
  userData: {
    width: 3,
  },
};

const useCardStyles = makeStyles({
  root: {
    marginBottom: "1rem",
  },
});

function Vault({ vaultAddress }) {
  const vault = useSelector((state) => getVault(state, vaultAddress));
  const cardClasses = useCardStyles();

  return (
    <Card className={cardClasses.root}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} md={layout.vaultData.width}>
            <VaultOverview vault={vault} />
          </Grid>

          <Grid item xs={12} md={layout.strategyData.width}>
            <StrategyHoldings vaultAddress={vaultAddress} />
          </Grid>

          <Grid item xs={12} md={layout.userData.width}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <UserHoldings vaultAddress={vaultAddress} />
              </Grid>
              <Grid item xs={12} md={6}>
                <UserEarnings vaultAddress={vaultAddress} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Vault;
