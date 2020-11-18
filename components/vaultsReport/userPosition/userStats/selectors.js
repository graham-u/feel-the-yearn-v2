import { createSelector } from "reselect";

const getUserStatsSelector = () =>
  createSelector(
    (state) => state.vaultsReport.userStats.stats,
    (_, vaultAddress) => vaultAddress,
    (userStats, vaultAddress) => userStats?.[vaultAddress.toLowerCase()]
  );

export { getUserStatsSelector };
