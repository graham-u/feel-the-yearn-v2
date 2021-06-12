import {
  getVaultVisibilitySetting,
  getVaultSortField,
} from "components/pageContainer/header/settingsPanel/selectors";
import { getVault, getAllVaults } from "components/vaultsReport/getVaultSelector";
import { getUserAllEarnings } from "components/vaultsReport/vault/userEarnings/selectors";
import { getUserBalances } from "components/vaultsReport/vault/userHoldings/selectors";
import { filter, orderBy, has } from "lodash";
import createCachedSelector from "re-reselect";
import { createSelector } from "reselect";

const getAllTokens = (state) => state.vaultsReport.underlyingTokens.data;

const getToken = createCachedSelector(
  getAllTokens,
  (state, tokenAddress) => tokenAddress,
  (allTokens, tokenAddress) => {
    return allTokens[tokenAddress];
  }
)((state, tokenAddress) => tokenAddress);

const getVaultIcon = createCachedSelector(getToken, (token) => {
  return token?.icon;
})((state, tokenAddress) => tokenAddress);

const getVaultUnderlyingToken = createCachedSelector(getVault, getAllTokens, (vault, allTokens) => {
  return allTokens[vault.token];
})((state, vaultAddress) => vaultAddress);

const getVaultsSortedByAlias = createSelector(getAllVaults, (vaults) => {
  return orderBy(vaults, [(vault) => vault.name.toLowerCase()]);
});

// For any selectors based on numerical sort, we default empty values to -9999 so that they fall to
// the bottom of the sorted result.

const getVaultsSortedByApy = createSelector(getAllVaults, (vaults) => {
  return orderBy(vaults, [(vault) => vault.metadata.apy.recommended || -9999], ["desc"]);
});

const getVaultsSortedByVaultHoldings = createSelector(getAllVaults, (vaults) => {
  return orderBy(
    vaults,
    [(vault) => Number(vault.underlyingTokenBalance.amountUsdc) || -9999],
    ["desc"]
  );
});

const getVaultsSortedByUserHoldings = createSelector(
  getAllVaults,
  getUserBalances,
  (vaults, userBalances) => {
    return orderBy(
      vaults,
      [(vault) => Number(userBalances[vault.address]?.amountUsdc) || -9999],
      ["desc"]
    );
  }
);

const getVaultsSortedByUserEarnings = createSelector(
  getAllVaults,
  getUserAllEarnings,
  (vaults, userEarnings) => {
    return orderBy(
      vaults,
      [(vault) => Number(userEarnings[vault.address]?.amountUsdc) || -9999],
      ["desc"]
    );
  }
);

const getSortedVaults = createSelector(
  getVaultSortField,
  getVaultsSortedByAlias,
  getVaultsSortedByApy,
  getVaultsSortedByVaultHoldings,
  getVaultsSortedByUserHoldings,
  getVaultsSortedByUserEarnings,
  (
    vaultSortField,
    vaultsSortedByAlias,
    vaultsSortedByApy,
    vaultsSortedByVaultHoldings,
    vaultsSortedByUserHoldings,
    vaultsSortedByUserEarnings
  ) => {
    const sortFieldSelectionResultMapping = {
      "Vault name": vaultsSortedByAlias,
      APY: vaultsSortedByApy,
      "Vault holdings (in USDC)": vaultsSortedByVaultHoldings,
      "User holdings (in USDC)": vaultsSortedByUserHoldings,
      "User earnings (in USDC)": vaultsSortedByUserEarnings,
    };

    if (!has(sortFieldSelectionResultMapping, vaultSortField)) {
      vaultSortField = "Vault name";
    }

    return sortFieldSelectionResultMapping[vaultSortField];
  }
);

const getReportVaults = createSelector(
  getSortedVaults,
  getUserBalances,
  getUserAllEarnings,
  getVaultVisibilitySetting,
  (vaults, userBalances, userEarnings, visibilitySetting) => {
    switch (visibilitySetting) {
      case "currentDeposits":
        vaults = filter(vaults, (vault) => {
          return userBalances[vault.address]?.amountUsdc > 0;
        });
        break;

      case "allDeposits":
        vaults = filter(vaults, (vault) => {
          return userEarnings[vault.address]?.amountUsdc > 0;
        });
        break;
    }

    return vaults;
  }
);

export { getVaultIcon, getVaultUnderlyingToken, getReportVaults, getToken };
