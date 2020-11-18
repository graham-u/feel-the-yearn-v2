import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useWeb3, useAddress } from "components/connectionProvider/hooks";
import { getDrizzleInitialized } from "components/drizzleCreator/selectors";
import { getVaults, getContractsAreAddedToDrizzle } from "components/vaultsReport/selectors";
import {
  initializeContractData,
  setPriceFetchInterval,
  setUserStatsFetchInterval,
} from "components/vaultsReport/setup";
import StrategyHoldings from "components/vaultsReport/strategyHoldings";
import UserPosition from "components/vaultsReport/userPosition";
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

const layoutWidths = {
  overview: 3,
  vaultHoldings: 3,
  strategyHoldings: 3,
  userPosition: 3,
};

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

  const userAddress = useAddress();
  useEffect(() => {
    // Check we have user address, not vaults...
    if (!isEmpty(userAddress)) {
      const interval = setUserStatsFetchInterval(userAddress, dispatch);
      return () => clearInterval(interval);
    }
  }, [userAddress]);

  const strategyContractsAddedToDrizzleRef = useRef({});
  const strategyContractsAddedToDrizzle = strategyContractsAddedToDrizzleRef.current;

  useEffect(() => {
    if (drizzleInitialized && vaults && !contractsAreAddedToDrizzle) {
      initializeContractData(vaults, web3, strategyContractsAddedToDrizzle, dispatch);
    }
  }, [drizzleInitialized, vaults]);

  const cardClasses = useCardStyles();

  return (
    <>
      {vaults.map((vault) => (
        <Card key={vault.address} className={cardClasses.root}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={layoutWidths.overview}>
                <VaultOverview vault={vault} />
              </Grid>

              <Grid item xs={12} lg={layoutWidths.vaultHoldings}>
                <VaultHoldings vault={vault} />
              </Grid>

              <Grid item xs={12} lg={layoutWidths.strategyHoldings}>
                <StrategyHoldings vault={vault} />
              </Grid>

              <Grid item xs={12} lg={layoutWidths.userPosition}>
                <UserPosition vault={vault} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default VaultsReport;
