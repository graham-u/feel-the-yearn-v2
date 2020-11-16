import { createSelector } from "reselect";

const getVaults = (state) => state.vaultsReport.vaultRegistry.vaults;

const getContractsAreAddedToDrizzle = (state) => state.vaultsReport.contractsAddedToDrizzle;

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

export { getVaults, getContractsAreAddedToDrizzle, makeTokenPriceSelector, getTokenSelector };
