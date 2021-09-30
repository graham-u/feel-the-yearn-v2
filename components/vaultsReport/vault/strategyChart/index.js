import { useTheme } from "@material-ui/core";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import { getStrategiesForVault } from "components/vaultsReport/vault/selectors";
import { map } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { VictoryPie } from "victory";

function StrategyChart({ vaultAddress }) {
  const theme = useTheme();
  const strategiesData = useSelector((state) => getStrategiesForVault(state, vaultAddress));

  const chartData = map(strategiesData.strategies, (strategy, index) => {
    return {
      x: index + 1,
      y: strategy.estimatedTotalAssets,
    };
  });

  return (
    <>
      <ReportLabel>Strategy holdings pie chart</ReportLabel>
      <VictoryPie
        colorScale={theme.mainColor}
        data={chartData}
        labelRadius={(element) => element.radius * 0.8}
        padding={10}
        style={{
          labels: { fontSize: 40, fill: "white" },
          data: {
            fillOpacity: 0.75,
          },
        }}
      />
    </>
  );
}

export default StrategyChart;
