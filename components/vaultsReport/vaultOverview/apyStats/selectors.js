import { createSelector } from "reselect";

const getVaultApySelector = () =>
  createSelector(
    (state) => state.vaultsReport.vaultsApyStats.stats,
    (_, vaultAddress) => vaultAddress,
    (vaultsApyStats, vaultAddress) => {
      return vaultsApyStats?.[vaultAddress];
    }
  );

export { getVaultApySelector };
