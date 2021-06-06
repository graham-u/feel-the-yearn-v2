import { getVaultSortField } from "components/pageContainer/header/settingsPanel/selectors";
import { getAllVaults } from "components/vaultsReport/selectors";
import { getUserAllEarnings } from "components/vaultsReport/vault/userEarnings/selectors";
import { getUserBalances } from "components/vaultsReport/vault/userHoldings/selectors";
import { orderBy, map, has } from "lodash";
import { createSelector } from "reselect";

const getVaultsAddressesSortedByAlias = createSelector(getAllVaults, (vaults) => {
  const orderedVaults = orderBy(vaults, [(vault) => vault.name.toLowerCase()]);
  return map(orderedVaults, (vault) => vault.address);
});

// For any selectors based on numerical sort, we default empty values to -9999 so that they fall to
// the bottom of the sorted result.

const getVaultsAddressesSortedByApy = createSelector(getAllVaults, (vaults) => {
  const orderedVaults = orderBy(
    vaults,
    [(vault) => vault.metadata.apy.recommended || -9999],
    ["desc"]
  );
  return map(orderedVaults, (vault) => vault.address);
});

const getVaultsAddressesSortedByVaultHoldings = createSelector(getAllVaults, (vaults) => {
  const orderedVaults = orderBy(
    vaults,
    [(vault) => Number(vault.underlyingTokenBalance.amountUsdc) || -9999],
    ["desc"]
  );
  return map(orderedVaults, (vault) => vault.address);
});

const getVaultsAddressesSortedByUserHoldings = createSelector(
  getAllVaults,
  getUserBalances,
  (vaults, userBalances) => {
    const orderedVaults = orderBy(
      vaults,
      [(vault) => Number(userBalances[vault.address]?.amountUsdc) || -9999],
      ["desc"]
    );
    return map(orderedVaults, (vault) => vault.address);
  }
);

const getVaultsAddressesSortedByUserEarnings = createSelector(
  getAllVaults,
  getUserAllEarnings,
  (vaults, userEarnings) => {
    const orderedVaults = orderBy(
      vaults,
      [(vault) => Number(userEarnings[vault.address]?.amountUsdc) || -9999],
      ["desc"]
    );
    return map(orderedVaults, (vault) => vault.address);
  }
);

const getSortedVaultAddresses = createSelector(
  getVaultSortField,
  getVaultsAddressesSortedByAlias,
  getVaultsAddressesSortedByApy,
  getVaultsAddressesSortedByVaultHoldings,
  getVaultsAddressesSortedByUserHoldings,
  getVaultsAddressesSortedByUserEarnings,
  (
    vaultSortField,
    vaultsAddressesSortedByAlias,
    vaultsAddressesSortedByApy,
    vaultsAddressesSortedByVaultHoldings,
    vaultsAddressesSortedByUserHoldings,
    vaultsAddressesSortedByUserEarnings
  ) => {
    const sortFieldSelectionResultMapping = {
      "Vault name": vaultsAddressesSortedByAlias,
      APY: vaultsAddressesSortedByApy,
      "Vault holdings (in USDC)": vaultsAddressesSortedByVaultHoldings,
      "User holdings (in USDC)": vaultsAddressesSortedByUserHoldings,
      "User earnings (in USDC)": vaultsAddressesSortedByUserEarnings,
    };

    if (!has(sortFieldSelectionResultMapping, vaultSortField)) {
      vaultSortField = "Vault name";
    }

    return sortFieldSelectionResultMapping[vaultSortField];
  }
);

export { getSortedVaultAddresses };
