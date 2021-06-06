import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getVault } from "components/vaultsReport/selectors";
import StrategyInfo from "components/vaultsReport/vault/strategyInfo";
import UserEarnings from "components/vaultsReport/vault/userEarnings";
import UserHoldings from "components/vaultsReport/vault/userHoldings";
import VaultHoldings from "components/vaultsReport/vault/vaultHoldings";
import VaultOverview from "components/vaultsReport/vault/vaultOverview";
import { useSelector } from "react-redux";

const layout = {
  overview: {
    width: 4,
    vaultDetails: {
      width: 12,
    },
  },
  data: {
    width: 8,
    vaultHoldings: { width: 3 },
    strategyHoldings: { width: 3 },
    userHoldings: { width: 3 },
    userEarnings: { width: 3 },
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
          <Grid container spacing={1} item md={layout.overview.width}>
            <Grid item xs={12} md={layout.overview.vaultDetails.width}>
              <VaultOverview vault={vault} />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="center" item md={layout.data.width}>
            <Grid item xs={12} sm={3} md={layout.data.vaultHoldings.width}>
              <VaultHoldings vaultAddress={vaultAddress} />
            </Grid>

            <Grid item xs={12} sm={3} md={layout.data.strategyHoldings.width}>
              <StrategyInfo vaultAddress={vaultAddress} />
            </Grid>

            <Grid item xs={12} sm={3} md={layout.data.userHoldings.width}>
              <UserHoldings vaultAddress={vaultAddress} />
            </Grid>

            <Grid item xs={12} sm={3} md={layout.data.userEarnings.width}>
              <UserEarnings vaultAddress={vaultAddress} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Vault;
