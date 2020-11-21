import { createSelector } from "reselect";

const getVaults = (state) => state.vaultsReport.vaultRegistry.vaults;

const getContractsMissingFromDrizzle = (state) => state.vaultsReport.contractsMissingFromDrizzle;

const getFinishedAddingContractsToDrizzle = (state) =>
  state.vaultsReport.finishedAddingContractsToDrizzle;

const makeTokenPriceSelector = (tokenAddress) => (state) =>
  state.vaultsReport.wantTokenPrices.prices[tokenAddress];

const getTokenSelector = () =>
  createSelector(
    (state) => state.vaultsReport.tokens,
    (_, tokenAddress) => tokenAddress,
    (tokens, tokenAddress) => {
      {
        return tokens?.[tokenAddress];
      }
    }
  );

const getUserStatsFetchFailed = (state) => Boolean(state.vaultsReport.userStats.error);
const getVaultRegistryFetchFailed = (state) => Boolean(state.vaultsReport.vaultRegistry.error);
const getTokenPricesFetchFailed = (state) => Boolean(state.vaultsReport.wantTokenPrices.error);
const getVaultApyStatsFetchFailed = (state) => Boolean(state.vaultsReport.vaultsApyStats.error);

export {
  getVaults,
  getFinishedAddingContractsToDrizzle,
  getContractsMissingFromDrizzle,
  makeTokenPriceSelector,
  getTokenSelector,
  getUserStatsFetchFailed,
  getVaultRegistryFetchFailed,
  getTokenPricesFetchFailed,
  getVaultApyStatsFetchFailed,
};
