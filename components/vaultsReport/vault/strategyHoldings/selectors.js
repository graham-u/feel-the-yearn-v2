import { getVault } from "components/vaultsReport/getVaultSelector";
import { map } from "lodash";
import createCachedSelector from "re-reselect";
import normalizedValue from "utils/normalizedValue";

const getAllStrategies = (state) => state.vaultsReport.strategies.data;

const getStrategiesForVault = createCachedSelector(
  getAllStrategies,
  getVault,
  (state, vaultAddress) => vaultAddress,
  (allStrategies, vault, vaultAddress) => {
    const vaultsStrategies = allStrategies[vaultAddress];
    const strategyInfo = map(vaultsStrategies, (strategy) => {
      return {
        ...strategy,
        estimatedTotalAssets: normalizedValue(strategy.estimatedTotalAssets, vault.decimals),
      };
    });

    return strategyInfo;
  }
)((state, vaultAddress) => vaultAddress);

export { getStrategiesForVault };
