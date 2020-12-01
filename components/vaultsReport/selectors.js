import { mapValues, transform, isUndefined, mapKeys } from "lodash";

import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";
import normalizedValue from "utils/normalizedValue";

/*
 * Utility function to used by various selectors, primarily to remove selector code duplication.
 * tokenAmounts and vaults are keyed by vault address, tokenPrices are keyed by token address.
 */
function convertTokenAmountsToFiatAmounts(tokenAmounts, vaults, tokenPrices) {
  const fiatAmounts = transform(
    tokenAmounts,
    (acc, tokenAmount, vaultAddress) => {
      const tokenAddress = vaults[vaultAddress].tokenAddress;
      const tokenPrice = tokenPrices[tokenAddress];
      // Its possible the token prices have not loaded yet, in which case, dont convert yet.
      // As this is called from selectors, this will be re-run as token prices load / update.
      if (!isUndefined(tokenPrice)) {
        acc[vaultAddress] = tokenAmount * tokenPrice;
      }
    },
    {}
  );

  return fiatAmounts;
}

/*
 * Vault selectors
 */
const getAllVaults = (state) => state.vaultsReport.vaultRegistry.vaults;

const getAllVaultsKeyedLowerCase = createSelector(getAllVaults, (allVaults) => {
  const allVaultsKeyedLowerCase = mapKeys(allVaults, (vault, vaultAddress) => {
    return vaultAddress.toLowerCase();
  });

  return allVaultsKeyedLowerCase;
});

const getOrderedVaultAddresses = (state) => state.vaultsReport.vaultRegistry.orderedVaultAddresses;

const getVault = createCachedSelector(
  getAllVaults,
  (state, vaultAddress) => vaultAddress,
  (allVaults, vaultAddress) => {
    return allVaults[vaultAddress];
  }
)((state, vaultAddress) => vaultAddress);

const getAllPricePerFullShare = (state) => state.vaultsReport.pricePerFullShare;

/*
 * Token selectors
 */
const getAllTokens = (state) => state.vaultsReport.tokens;

const getStrategyWantTokensMapping = (state) => state.vaultsReport.strategyWantTokensMapping;

const getAllWantTokenPrices = (state) => state.vaultsReport.wantTokenPrices.prices;

const getStrategyWantTokenAddress = (state, strategyAddress) =>
  getStrategyWantTokensMapping(state)[strategyAddress];

const getVaultWantToken = (state, vaultAddress) => {
  const vault = getVault(state, vaultAddress);
  const allTokens = getAllTokens(state);
  return allTokens[vault.tokenAddress];
};

const getStrategyWantToken = (state, strategyAddress) => {
  const strategyWantTokenAddress = getStrategyWantTokenAddress(state, strategyAddress);
  const allTokens = getAllTokens(state);
  return allTokens[strategyWantTokenAddress];
};

/*
 * Vault holdings selectors
 */
const getAllVaultRawHoldings = (state) => state.vaultsReport.allVaultRawHoldings;

const getAllVaultsHoldings = createSelector(
  getAllVaultRawHoldings,
  getAllVaults,
  (allVaultRawHoldings, allVaults) => {
    const allVaultHoldings = mapValues(allVaultRawHoldings, (vaultRawHoldings, vaultAddress) => {
      const vaultWantTokenDecimals = allVaults[vaultAddress].decimals;
      return normalizedValue(vaultRawHoldings, vaultWantTokenDecimals);
    });

    return allVaultHoldings;
  }
);

const getVaultHoldings = (state, vaultAddress) => getAllVaultsHoldings(state)[vaultAddress];

const getAllVaultsFiatValue = createSelector(
  getAllVaultsHoldings,
  getAllVaults,
  getAllWantTokenPrices,
  convertTokenAmountsToFiatAmounts
);

const getVaultFiatValue = (state, vaultAddress) => getAllVaultsFiatValue(state)[vaultAddress];

/*
 * Strategy holdings selectors
 */
const getAllStrategyRawHoldings = (state) => state.vaultsReport.allStrategyRawHoldings;

const getAllStrategiesHoldings = createSelector(
  getAllStrategyRawHoldings,
  getStrategyWantTokensMapping,
  getAllTokens,
  (allStrategyRawHoldings, strategyWantTokensMapping, allTokens) => {
    const allStrategyHoldings = transform(
      allStrategyRawHoldings,
      (acc, strategyRawHoldings, strategyAddress) => {
        const strategyWantTokenAddress = strategyWantTokensMapping[strategyAddress];
        const strategyWantToken = allTokens[strategyWantTokenAddress];

        if (!isUndefined(strategyWantToken)) {
          const strategyWantTokenDecimals = strategyWantToken.decimals;
          acc[strategyAddress] = normalizedValue(strategyRawHoldings, strategyWantTokenDecimals);
        }
      },
      {}
    );

    return allStrategyHoldings;
  }
);

const getStrategyHoldings = (state, strategyAddress) =>
  getAllStrategiesHoldings(state)[strategyAddress];

const getAllStrategiesFiatValue = createSelector(
  getAllStrategiesHoldings,
  getStrategyWantTokensMapping,
  getAllWantTokenPrices,
  (allStrategiesHoldings, strategyWantTokensMapping, allWantTokenPrices) => {
    const allStrategiesFiatValues = transform(
      allStrategiesHoldings,
      (acc, strategyHoldings, strategyAddress) => {
        const strategyWantTokenAddress = strategyWantTokensMapping[strategyAddress];
        const wantTokenPrice = allWantTokenPrices[strategyWantTokenAddress];
        if (!isUndefined(wantTokenPrice)) {
          acc[strategyAddress] = strategyHoldings * wantTokenPrice;
        }
      },
      {}
    );

    return allStrategiesFiatValues;
  }
);

const getStrategyFiatValue = (state, strategyAddress) =>
  getAllStrategiesFiatValue(state)[strategyAddress];

/*
 * User holdings selectors
 */
const getAllUserRawYvHoldings = (state) => state.vaultsReport.allUserRawYvHoldings;

const getAllUserHoldings = createSelector(
  getAllUserRawYvHoldings,
  getAllPricePerFullShare,
  getAllVaults,
  (allUserRawYvHoldings, allPricePerFullShare, allVaults) => {
    const allUserHoldings = transform(
      allUserRawYvHoldings,
      (acc, userRawYvHoldings, vaultAddress) => {
        const pricePerFullShare = allPricePerFullShare[vaultAddress];
        if (!isUndefined(pricePerFullShare)) {
          const vaultWantTokenDecimals = allVaults[vaultAddress].decimals;
          acc[vaultAddress] =
            normalizedValue(userRawYvHoldings, vaultWantTokenDecimals) * pricePerFullShare;
        }
      }
    );

    return allUserHoldings;
  }
);

const getUserHoldings = (state, vaultAddress) => getAllUserHoldings(state)[vaultAddress];

const getAllUserFiatValue = createSelector(
  getAllUserHoldings,
  getAllVaults,
  getAllWantTokenPrices,
  convertTokenAmountsToFiatAmounts
);

const getUserFiatValue = (state, vaultAddress) => getAllUserFiatValue(state)[vaultAddress];

/*
 * User stats selectors
 * API currently returns user stats with vault addresses in lower case. As we can't guarantee Web3
 * being available for user stats, we cannot convert to checksummed addresses, so will instead have
 * handle this at the point of using vault addresses.
 */
const getAllUserStats = (state) => state.vaultsReport.userStats.stats;

const getAllUserEarnings = createSelector(
  getAllUserStats,
  getAllVaultsKeyedLowerCase,
  (allUserStats, allVaultsKeyedLowerCase) => {
    const allUserEarnings = transform(allUserStats, (acc, userStats, vaultAddress) => {
      const vaultWantTokenDecimals = allVaultsKeyedLowerCase[vaultAddress].decimals;
      acc[vaultAddress] = normalizedValue(userStats.earnings, vaultWantTokenDecimals);
    });

    return allUserEarnings;
  }
);

const getUserEarnings = (state, vaultAddress) =>
  getAllUserEarnings(state)[vaultAddress.toLowerCase()];

const getAllUserEarningsFiatValue = createSelector(
  getAllUserEarnings,
  getAllVaultsKeyedLowerCase,
  getAllWantTokenPrices,
  convertTokenAmountsToFiatAmounts
);

const getUserEarningsFiatValue = (state, vaultAddress) =>
  getAllUserEarningsFiatValue(state)[vaultAddress.toLowerCase()];

/* Load / Error selectors */
const getUserStatsFetchFailed = (state) => Boolean(state.vaultsReport.userStats.error);
const getVaultRegistryFetchFailed = (state) => Boolean(state.vaultsReport.vaultRegistry.error);
const getTokenPricesFetchFailed = (state) => Boolean(state.vaultsReport.wantTokenPrices.error);
const getVaultApyStatsFetchFailed = (state) => Boolean(state.vaultsReport.vaultsApyStats.error);

const getUserStatsLoading = (state) => state.vaultsReport.userStats.loading;
const getVaultRegistryLoading = (state) => state.vaultsReport.vaultRegistry.loading;
const getTokenPricesLoading = (state) => state.vaultsReport.wantTokenPrices.loading;
const getVaultApyStatsLoading = (state) => state.vaultsReport.vaultsApyStats.loading;

const getVaultRegistryLoaded = (state) => state.vaultsReport.vaultRegistry.loaded;

export {
  getAllVaults,
  getVault,
  getOrderedVaultAddresses,
  getAllVaultsHoldings,
  getVaultHoldings,
  getVaultFiatValue,
  getStrategyHoldings,
  getStrategyFiatValue,
  getUserHoldings,
  getUserFiatValue,
  getUserEarnings,
  getUserEarningsFiatValue,
  getVaultWantToken,
  getStrategyWantTokensMapping,
  getStrategyWantTokenAddress,
  getStrategyWantToken,
  getUserStatsFetchFailed,
  getVaultRegistryFetchFailed,
  getTokenPricesFetchFailed,
  getVaultApyStatsFetchFailed,
  getUserStatsLoading,
  getVaultRegistryLoading,
  getTokenPricesLoading,
  getVaultApyStatsLoading,
  getVaultRegistryLoaded,
};
