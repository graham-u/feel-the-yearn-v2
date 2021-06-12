import { getVaultUnderlyingToken, getStrategiesLoading } from "components/vaultsReport/selectors";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import { getStrategiesForVault } from "components/vaultsReport/vault/strategyHoldings/selectors";
import TokenAndUSDCBalance from "components/vaultsReport/vault/tokenAndUSDCBalance";
import StrategyLink from "components/vaultsReport/vault/vaultOverview/strategyLink";
import { map } from "lodash";
import React from "react";
import { useSelector } from "react-redux";

function StrategyHoldings({ vaultAddress }) {
  const strategiesLoading = useSelector(getStrategiesLoading);
  const strategies = useSelector((state) => getStrategiesForVault(state, vaultAddress));
  const underlyingToken = useSelector((state) => getVaultUnderlyingToken(state, vaultAddress));

  return (
    <>
      <ReportLabel>Strategy holdings</ReportLabel>
      {strategiesLoading
        ? "Strategies loading"
        : map(strategies, (strategy) => {
            return (
              <React.Fragment key={strategy.address}>
                <StrategyLink
                  strategy={strategy}
                  address={strategy.address}
                  linkText={strategy.name}
                />
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
