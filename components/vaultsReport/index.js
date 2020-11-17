import { Typography, useTheme, useMediaQuery } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useWeb3 } from "components/connectionProvider/hooks";
import { getDrizzleInitialized } from "components/drizzleCreator/selectors";
import { getVaults, getContractsAreAddedToDrizzle } from "components/vaultsReport/selectors";
import { initializeContractData, setPriceFetchInterval } from "components/vaultsReport/setup";
import StrategyHoldings from "components/vaultsReport/strategyHoldings";
import UserHoldings from "components/vaultsReport/userHoldings";
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

const useHeaderCardContentStyles = makeStyles({
  root: {
    backgroundColor: "rgba(229, 107, 115, 0.25)",
    padding: "8px 16px",
    "&:last-child": {
      paddingBottom: "8px",
    },
  },
});

const layoutWidths = {
  overview: 3,
  vaultHoldings: 2,
  strategyHoldings: 2,
  userHoldings: 2,
};

function VaultsReportComponentHeader({ title }) {
  return (
    <Typography variant="h5" component="p">
      {title}
    </Typography>
  );
}

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
  const headerCardContentClasses = useHeaderCardContentStyles();

  const theme = useTheme();
  const showComponentHeaders = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      {showComponentHeaders && (
        <Card elevation={0} className={cardClasses.root}>
          <CardContent className={headerCardContentClasses.root}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={layoutWidths.overview}>
                <VaultsReportComponentHeader title="Vault / strategy" />
              </Grid>

              <Grid item xs={12} lg={layoutWidths.vaultHoldings}>
                <VaultsReportComponentHeader title="Vault holdings" />
              </Grid>

              <Grid item xs={12} lg={layoutWidths.strategyHoldings}>
                <VaultsReportComponentHeader title="Strategy holdings" />
              </Grid>

              <Grid item xs={12} lg={layoutWidths.userHoldings}>
                <VaultsReportComponentHeader title="User holdings" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
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

              <Grid item xs={12} lg={layoutWidths.userHoldings}>
                <UserHoldings vault={vault} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default VaultsReport;
