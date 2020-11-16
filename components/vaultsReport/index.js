import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useWeb3 } from "components/connectionProvider/hooks";
import { getDrizzleInitialized } from "components/drizzleCreator/selectors";
import { getVaults, getContractsAreAddedToDrizzle } from "components/vaultsReport/selectors";
import { initializeContractData, setPriceFetchInterval } from "components/vaultsReport/setup";
import StrategyHoldings from "components/vaultsReport/strategyHoldings";
import VaultHoldings from "components/vaultsReport/vaultHoldings";
import VaultOverview from "components/vaultsReport/vaultOverview";
import { isEmpty } from "lodash";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./slice";

const useCardStyles = makeStyles({
  root: {
    marginBottom: "1rem",
  },
});

function VaultsReport() {
  const dispatch = useDispatch();
  let vaults = useSelector(getVaults);
  const web3 = useWeb3();
  const drizzleInitialized = useSelector(getDrizzleInitialized);
  const contractsAreAddedToDrizzle = useSelector(getContractsAreAddedToDrizzle);

  useEffect(() => {
    dispatch(actions.fetchVaults());
  }, []);

  useEffect(() => {
    if (!isEmpty(vaults)) {
      const interval = setPriceFetchInterval(vaults, dispatch);
      return () => clearInterval(interval);
    }
  }, [vaults]);

  const strategyContractsAddedToDrizzleRef = useRef({});
  const strategyContractsAddedToDrizzle = strategyContractsAddedToDrizzleRef.current;

  useEffect(() => {
    if (drizzleInitialized && vaults && !contractsAreAddedToDrizzle) {
      initializeContractData(vaults, web3, strategyContractsAddedToDrizzle, dispatch);
    }
  }, [drizzleInitialized, vaults]);

  const cardClasses = useCardStyles();

  return vaults.map((vault) => (
    <Card key={vault.address} className={cardClasses.root}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <VaultOverview vault={vault} />
          </Grid>

          <Grid item xs={12} lg={2}>
            <VaultHoldings vault={vault} />
          </Grid>

          <Grid item xs={12} lg={2}>
            <StrategyHoldings vault={vault} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  ));
}

export default VaultsReport;
