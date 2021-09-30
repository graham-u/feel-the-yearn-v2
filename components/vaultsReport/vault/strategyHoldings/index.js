import { Typography } from "@material-ui/core";
import { getVaultUnderlyingToken, getStrategiesLoading } from "components/vaultsReport/selectors";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import { getStrategiesForVault } from "components/vaultsReport/vault/selectors";
import TokenAndUSDCBalance from "components/vaultsReport/vault/tokenAndUSDCBalance";
import StrategyLink from "components/vaultsReport/vault/vaultOverview/strategyLink";
import { map } from "lodash";
import React from "react";
import { useSelector } from "react-redux";

function StrategyHoldings({ vaultAddress }) {
  const strategiesLoading = useSelector(getStrategiesLoading);
  const strategiesData = useSelector((state) => getStrategiesForVault(state, vaultAddress));
  const underlyingToken = useSelector((state) => getVaultUnderlyingToken(state, vaultAddress));

  return (
    <>
      <ReportLabel>Strategy holdings</ReportLabel>
      <TokenAndUSDCBalance
        tokenBalance={strategiesData.estimatedTotalAssets}
        usdcBalance={undefined}
        token={underlyingToken}
      />
      <ReportLabel>Strategy holdings breakdown</ReportLabel>
      {strategiesLoading
        ? "Strategies loading"
        : map(strategiesData.strategies, (strategy, index) => {
            return (
              <React.Fragment key={strategy.address}>
                <StrategyLink
                  strategy={strategy}
                  address={strategy.address}
                  linkText={`${index + 1}: ${strategy.name}`}
                />
                <Typography display={"inline"}>
                  {` (${strategy.percentOfAssets.toFixed(2)}%)`}
                </Typography>
                <div>
                  <TokenAndUSDCBalance
                    tokenBalance={strategy.estimatedTotalAssets}
                    usdcBalance={undefined}
                    token={underlyingToken}
                  />
                </div>
              </React.Fragment>
            );
          })}
    </>
  );
}

export default StrategyHoldings;
