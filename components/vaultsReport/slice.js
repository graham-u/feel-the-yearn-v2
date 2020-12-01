import { createSlice } from "@reduxjs/toolkit";
import { transform } from "lodash";
import getTokenSymbolAlias from "utils/getTokenSymbolAlias";

const vaultRegistrySubSlice = {
  initialState: {
    vaultRegistry: {
      vaults: {},
      orderedVaultAddresses: [],
      loading: false,
      loaded: false,
      error: false,
    },
  },
  reducers: {
    fetchVaults(state) {
      state.vaultRegistry.loading = true;
      state.vaultRegistry.error = false;
    },
    fetchVaultsSuccess(state, action) {
      const { vaults, orderedVaultAddresses } = action.payload;
      state.vaultRegistry.vaults = vaults;
      state.vaultRegistry.orderedVaultAddresses = orderedVaultAddresses;

      const tokens = transform(vaults, (acc, vault) => {
        const tokenAddress = vault.tokenAddress;
        acc[tokenAddress] = {
          name: vault.tokenName,
          symbol: vault.tokenSymbol,
          symbolAlias: getTokenSymbolAlias(vault.tokenSymbol),
          decimals: vault.decimals,
          address: tokenAddress,
        };
      });

      keyAndStoreTokens(state.tokens, tokens);
      state.vaultRegistry.loading = false;
      state.vaultRegistry.loaded = true;
    },
    fetchVaultsFailure(state, action) {
      state.vaultRegistry.loading = false;
      state.vaultRegistry.error = true;
    },
  },
};

const strategyTokenMappingSlice = {
  initialState: {
    strategyWantTokensMapping: {},
  },
  reducers: {
    getStrategyWantTokenMapping(state, action) {
      state.strategyWantTokensMapping = action.payload.strategyWantTokenMapping;
    },
  },
};

const vaultHoldingsSlice = {
  initialState: {
    allVaultRawHoldings: {},
  },
  reducers: {
    receivedRawVaultHoldings(state, action) {
      const { vaultAddress, rawHoldings } = action.payload;
      state.allVaultRawHoldings[vaultAddress] = rawHoldings;
    },
  },
};

const strategyHoldingsSlice = {
  initialState: {
    allStrategyRawHoldings: {},
  },
  reducers: {
    receivedRawStrategyHoldings(state, action) {
      const { strategyAddress, rawHoldings } = action.payload;
      state.allStrategyRawHoldings[strategyAddress] = rawHoldings;
    },
  },
};

const userHoldingsSlice = {
  initialState: {
    allUserRawYvHoldings: {},
  },
  reducers: {
    receivedRawUserYvHoldings(state, action) {
      const { vaultAddress, rawYvHoldings } = action.payload;
      state.allUserRawYvHoldings[vaultAddress] = rawYvHoldings;
    },
  },
};

const pricePerFullShareSlice = {
  initialState: {
    pricePerFullShare: {},
  },
  reducers: {
    updatePricePerFullShare(state, action) {
      const { vaultAddress, pricePerFullShare } = action.payload;
      state.pricePerFullShare[vaultAddress] = pricePerFullShare;
    },
  },
};

const vaultsApySubSlice = {
  initialState: {
    vaultsApyStats: {
      stats: [],
      loading: false,
      error: false,
    },
  },
  reducers: {
    fetchVaultsApy(state) {
      state.vaultsApyStats.loading = true;
      state.vaultsApyStats.error = false;
    },
    fetchVaultsApySuccess(state, action) {
      let vaultsApyStats = action.payload;
      state.vaultsApyStats.stats = vaultsApyStats;
      state.vaultsApyStats.loading = false;
    },
    fetchVaultsApyFailure(state, action) {
      state.vaultsApyStats.loading = false;
      state.vaultsApyStats.error = true;
    },
  },
};

const wantTokenPricesSubSlice = {
  initialState: {
    wantTokenPrices: {
      prices: {},
      loading: false,
      error: false,
    },
  },
  reducers: {
    fetchWantTokenPrices(state) {
      state.wantTokenPrices.loading = true;
      state.wantTokenPrices.error = false;
    },
    fetchWantTokenPricesSuccess(state, action) {
      state.wantTokenPrices.prices = action.payload;
      state.wantTokenPrices.loading = false;
    },
    fetchWantTokenPricesFailure(state, action) {
      state.wantTokenPrices.loading = false;
      state.wantTokenPrices.error = true;
    },
  },
};

const tokensSubSlice = {
  initialState: {
    tokens: {},
  },
  reducers: {
    getStrategyTokenData(state, action) {
      keyAndStoreTokens(state.tokens, action.payload.strategyTokenData);
    },
  },
};

const userStatsSubSlice = {
  initialState: {
    userStats: {
      stats: {},
      loading: false,
      error: false,
    },
  },
  reducers: {
    fetchUserStats(state) {
      state.userStats.loading = true;
      state.userStats.error = false;
    },
    fetchUserStatsSuccess(state, action) {
      state.userStats.stats = action.payload;
      state.userStats.loading = false;
    },
    fetchUserStatsFailure(state, action) {
      state.userStats.loading = false;
      state.userStats.error = true;
    },
  },
};

function keyAndStoreTokens(tokensState, tokensToSave) {
  Object.assign(tokensState, tokensToSave);
}

const slice = createSlice({
  name: "vaultsReport",
  initialState: {
    ...vaultRegistrySubSlice.initialState,
    ...wantTokenPricesSubSlice.initialState,
    ...tokensSubSlice.initialState,
    ...userStatsSubSlice.initialState,
    ...vaultsApySubSlice.initialState,
    ...strategyTokenMappingSlice.initialState,
    ...vaultHoldingsSlice.initialState,
    ...userHoldingsSlice.initialState,
    ...strategyHoldingsSlice.initialState,
    ...pricePerFullShareSlice.initialState,
  },
  reducers: {
    ...vaultRegistrySubSlice.reducers,
    ...wantTokenPricesSubSlice.reducers,
    ...tokensSubSlice.reducers,
    ...userStatsSubSlice.reducers,
    ...vaultsApySubSlice.reducers,
    ...strategyTokenMappingSlice.reducers,
    ...vaultHoldingsSlice.reducers,
    ...userHoldingsSlice.reducers,
    ...strategyHoldingsSlice.reducers,
    ...pricePerFullShareSlice.reducers,
  },
});

export const { name, actions, reducer } = slice;
