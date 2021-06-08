/* These selectors were extracted to this file to avoid a circular dependency */

import createCachedSelector from "re-reselect";

const getAllVaults = (state) => state.vaultsReport.vaults.data;

const getVault = createCachedSelector(
  getAllVaults,
  (state, vaultAddress) => vaultAddress,
  (allVaults, vaultAddress) => {
    return allVaults[vaultAddress];
  }
)((state, vaultAddress) => vaultAddress);

export { getAllVaults, getVault };
