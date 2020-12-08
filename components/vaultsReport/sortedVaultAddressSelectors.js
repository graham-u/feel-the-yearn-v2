import { getVaultSortField } from "components/pageContainer/header/settingsPanel/selectors";
import {
  getAllVaults,
  getVaultStats,
  getAllVaultsFiatValue,
  getAllStrategiesFiatValue,
  getAllUserFiatValue,
  getAllUserEarningsFiatValue,
} from "components/vaultsReport/selectors";
import { orderBy, map, has } from "lodash";
import { createSelector } from "reselect";

const getVaultsAddressesSortedByAlias = createSelector(getAllVaults, (vaults) => {
  const orderedVaults = orderBy(vaults, [(vault) => vault.vaultAlias.toLowerCase()]);
  return map(orderedVaults, (vault) => vault.address);
});

// For any selectors based on numerical sort, we default empty values to -9999 so that they fall to
// the bottom of the sorted result.
const getVaultsAddressesSortedByApyWeekBased = createSelector(
  getAllVaults,
  getVaultStats,
  (vaults, vaultsStats) => {
    const orderedVaults = orderBy(
      vaults,
      [(vault) => vaultsStats?.[vault.address]?.apyOneWeekSample || -9999],
      ["desc"]
    );

    return map(orderedVaults, (vault) => vault.address);
  }
);

const getVaultsAddressesSortedByApyMonthBased = createSelector(
  getAllVaults,
  getVaultStats,
  (vaults, vaultsStats) => {
    const orderedVaults = orderBy(
      vaults,
      [(vault) => vaultsStats?.[vault.address]?.apyOneMonthSample || -9999],
      ["desc"]
    );
    return map(orderedVaults, (vault) => vault.address);
  }
);

const getVaultsAddressesSortedByApyInceptionBased = createSelector(
  getAllVaults,
  getVaultStats,
  (vaults, vaultsStats) => {
    const orderedVaults = orderBy(
      vaults,
      [(vault) => vaultsStats?.[vault.address]?.apyInceptionSample || -9999],
      ["desc"]
    );
    return map(orderedVaults, (vault) => vault.address);
  }
);

const getVaultsAddressesSortedByVaultHoldings = createSelector(
  getAllVaults,
  getAllVaultsFiatValue,
  (vaults, vaultsHoldings) => {
    const orderedVaults = orderBy(
      vaults,
      [(vault) => vaultsHoldings?.[vault.address] || -9999],
      ["desc"]
    );
    return map(orderedVaults, (vault) => vault.address);
  }
);

const getVaultsAddressesSortedByStrategyHoldings = createSelector(
  getAllVaults,
  getAllStrategiesFiatValue,
  (vaults, strategiesHoldings) => {
    const orderedVaults = orderBy(
      vaults,
      [(vault) => strategiesHoldings?.[vault.strategyAddress] || -9999],
      ["desc"]
    );
    return map(orderedVaults, (vault) => vault.address);
  }
);

const getVaultsAddressesSortedByUserHoldings = createSelector(
  getAllVaults,
  getAllUserFiatValue,
  (vaults, userHoldings) => {
    const orderedVaults = orderBy(
      vaults,
      [(vault) => userHoldings?.[vault.address] || -9999],
      ["desc"]
    );
    return map(orderedVaults, (vault) => vault.address);
  }
);

const getVaultsAddressesSortedByUserEarnings = createSelector(
  getAllVaults,
  getAllUserEarningsFiatValue,
  (vaults, userEarnings) => {
    const orderedVaults = orderBy(
      vaults,
      [(vault) => userEarnings?.[vault.address.toLowerCase()] || -9999],
      ["desc"]
    );
    return map(orderedVaults, (vault) => vault.address);
  }
);

/*
 * Sorted vault addresses selector
 */
const getSortedVaultAddresses = createSelector(
  getVaultSortField,
  getVaultsAddressesSortedByAlias,
  getVaultsAddressesSortedByApyWeekBased,
  getVaultsAddressesSortedByApyMonthBased,
  getVaultsAddressesSortedByApyInceptionBased,
  getVaultsAddressesSortedByVaultHoldings,
  getVaultsAddressesSortedByStrategyHoldings,
  getVaultsAddressesSortedByUserHoldings,
  getVaultsAddressesSortedByUserEarnings,
  (
    vaultSortField,
    vaultsAddressesSortedByAlias,
    vaultsAddressesSortedByApyWeekBased,
    vaultsAddressesSortedByApyMonthBased,
    vaultsAddressesSortedByApyInceptionBased,
    vaultsAddressesSortedByVaultHoldings,
    vaultsAddressesSortedByStrategyHoldings,
    vaultsAddressesSortedByUserHoldings,
    vaultsAddressesSortedByUserEarnings
  ) => {
    const sortFieldSelectionResultMapping = {
      "Vault name": vaultsAddressesSortedByAlias,
      "APY (week based)": vaultsAddressesSortedByApyWeekBased,
      "APY (month based)": vaultsAddressesSortedByApyMonthBased,
      "APY (all time based)": vaultsAddressesSortedByApyInceptionBased,
      "Vault holdings": vaultsAddressesSortedByVaultHoldings,
      "Strategy holdings": vaultsAddressesSortedByStrategyHoldings,
      "User holdings": vaultsAddressesSortedByUserHoldings,
      "Lifetime earnings": vaultsAddressesSortedByUserEarnings,
    };

    if (!has(sortFieldSelectionResultMapping, vaultSortField)) {
      vaultSortField = "Vault name";
    }

    return sortFieldSelectionResultMapping[vaultSortField];
  }
);

export { getSortedVaultAddresses };
