import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconTip from "components/vaultsReport/iconTip";
import ReportLabel from "components/vaultsReport/reportLabel";
import { getVaultApySelector } from "components/vaultsReport/vaultOverview/apyStats/selectors";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const apyLabelDataMap = {
  Weekly: {
    dataKey: "apyOneWeekSample",
    helpText: "Extrapolated annual return based on 1 week of data.",
  },
  Monthly: {
    dataKey: "apyOneMonthSample",
    helpText: "Extrapolated annual return based on 1 month of data.",
  },
  "All time": {
    dataKey: "apyInceptionSample",
    helpText: "Extrapolated annual return based on all historical data",
  },
};

function ApyStats({ vaultAddress }) {
  const getApyStats = useMemo(() => getVaultApySelector(), []);
  const apyStats = useSelector((state) => getApyStats(state, vaultAddress));

  return (
    <>
      <Grid container spacing={1} wrap="nowrap" alignItems="flex-start">
        {["Weekly", "Monthly", "All time"].map((interval) => {
          const helpText = apyLabelDataMap[interval].helpText;

          return (
            <Grid key={interval} item xs={4}>
              <ReportLabel>
                {interval}
                <IconTip>{helpText}</IconTip>
              </ReportLabel>
            </Grid>
          );
        })}
      </Grid>
      <Grid container>
        {["Weekly", "Monthly", "All time"].map((interval) => {
          const dataKey = apyLabelDataMap[interval].dataKey;
          const result = apyStats ? apyStats[dataKey].toFixed(2) + "%" : "-";

          return (
            <Grid key={interval} item xs={4}>
              <Typography variant="body1">{result}</Typography>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default ApyStats;
