import { getVault } from "components/vaultsReport/getVaultSelector";
import { map, orderBy, reduce } from "lodash";
import createCachedSelector from "re-reselect";
import normalizedValue from "utils/normalizedValue";

const getAllStrategies = (state) => state.vaultsReport.strategies.data;

const getStrategiesForVault = createCachedSelector(
  getAllStrategies,
  getVault,
  (state, vaultAddress) => vaultAddress,
  (allStrategies, vault, vaultAddress) => {
    let vaultsStrategies = allStrategies[vaultAddress];

    let strategyInfo = {
      estimatedTotalAssets: 0,
      strategies: [],
    };

    strategyInfo.estimatedTotalAssets = reduce(
      vaultsStrategies,
      (total, strategy) => total + normalizedValue(strategy.estimatedTotalAssets, vault.decimals),
      0
    );

    strategyInfo.strategies = map(vaultsStrategies, (strategy) => {
      const strategiesEstimatedTotalAssets = normalizedValue(
        strategy.estimatedTotalAssets,
        vault.decimals
      );
      return {
        ...strategy,
        estimatedTotalAssets: strategiesEstimatedTotalAssets,
        percentOfAssets: (strategiesEstimatedTotalAssets / strategyInfo.estimatedTotalAssets) * 100,
      };
    });

    strategyInfo.strategies = orderBy(strategyInfo.strategies, "estimatedTotalAssets", "desc");

    return strategyInfo;
  }
)((state, vaultAddress) => vaultAddress);

export { getStrategiesForVault };
