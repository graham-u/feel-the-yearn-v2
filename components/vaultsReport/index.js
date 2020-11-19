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
import UserHoldings from "components/vaultsReport/userHoldings";
import UserStats from "components/vaultsReport/userStats";
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

const layout = {
  overview: {
    width: 3,
    vaultDetails: {
      width: 12,
    },
  },
  data: {
    width: 9,
    vaultHoldings: { width: 3 },
    strategyHoldings: { width: 3 },
    userHoldings: { width: 3 },
    userEarnings: { width: 3 },
  },
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
    dispatch(actions.fetchVaultsApy());
  }, []);

  useEffect(() => {
    if (!isEmpty(vaults)) {
      const interval = setPriceFetchInterval(vaults, dispatch);
      return () => clearInterval(interval);
    }
  }, [vaults]);

  const userAddress = useAddress();
  useEffect(() => {
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
            <Grid container spacing={0}>
              <Grid container spacing={1} item md={layout.overview.width}>
                <Grid item xs={12} md={layout.overview.vaultDetails.width}>
                  <VaultOverview vault={vault} />
                </Grid>
              </Grid>

              <Grid container spacing={1} item md={layout.data.width}>
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
      ))}
    </>
  );
}

export default VaultsReport;
