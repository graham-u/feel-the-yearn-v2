import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getVault } from "components/vaultsReport/selectors";
import StrategyHoldings from "components/vaultsReport/vault/strategyHoldings";
import UserHoldings from "components/vaultsReport/vault/userHoldings";
import UserStats from "components/vaultsReport/vault/userStats";
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
              <VaultHoldings vault={vault} />
            </Grid>

            <Grid item xs={12} sm={3} md={layout.data.strategyHoldings.width}>
              <StrategyHoldings vault={vault} />
            </Grid>

            <Grid item xs={12} sm={3} md={layout.data.strategyHoldings.width}>
              <UserHoldings vault={vault} />
            </Grid>

            <Grid item xs={12} sm={3} md={layout.data.strategyHoldings.width}>
              <UserStats vault={vault} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Vault;
