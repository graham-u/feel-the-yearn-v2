import { createSlice } from "@reduxjs/toolkit";

const vaultRegistrySubSlice = {
  initialState: {
    vaultRegistry: {
      vaults: [],
      loading: false,
      error: false,
    },
  },
  reducers: {
    fetchVaults(state) {
      state.vaultRegistry.loading = true;
      state.vaultRegistry.error = false;
    },
    fetchVaultsSuccess(state, action) {
      const vaults = action.payload;
      state.vaultRegistry.vaults = vaults;

      const tokens = vaults.map((vault) => {
        return {
          name: vault.tokenName,
          symbol: vault.tokenSymbol,
          symbolAlias: vault.tokenSymbolAlias,
          decimals: vault.decimals,
          address: vault.tokenAddress,
        };
      });

      keyAndStoreTokens(state.tokens, tokens);
      state.vaultRegistry.loading = false;
    },
    fetchVaultsFailure(state, action) {
      const { error } = action.payload;
      state.vaultRegistry.loading = false;
      state.vaultRegistry.error = error;
    },
  },
};

const contractsAddedToDrizzleSubSlice = {
  initialState: {
    contractsAddedToDrizzle: false,
  },
  reducers: {
    addContractsToDrizzleSuccess(state) {
      state.contractsAddedToDrizzle = true;
    },
  },
};

const wantTokenPricesSubSlice = {
  initialState: {
    wantTokenPrices: {
      prices: {},
      loading: false,
      error: null,
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
      const { error } = action.payload;
      state.wantTokenPrices.loading = false;
      state.wantTokenPrices.error = error;
    },
  },
};

const tokensSubSlice = {
  initialState: {
    tokens: {},
  },
  reducers: {
    getStrategyTokensSuccess(state, action) {
      const strategyTokens = action.payload;
      keyAndStoreTokens(state.tokens, strategyTokens);
    },
  },
};

const userStatsSubSlice = {
  initialState: {
    userStats: {
      stats: {},
      loading: false,
      error: null,
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
      const { error } = action.payload;
      state.userStats.loading = false;
      state.userStats.error = error;
    },
  },
};

function keyAndStoreTokens(tokensState, tokensToSave) {
  tokensToSave.forEach((token) => {
    tokensState[token.address] = token;
  });
}

const slice = createSlice({
  name: "vaultsReport",
  initialState: {
    ...vaultRegistrySubSlice.initialState,
    ...wantTokenPricesSubSlice.initialState,
    ...contractsAddedToDrizzleSubSlice.initialState,
    ...tokensSubSlice.initialState,
    ...userStatsSubSlice.initialState,
  },
  reducers: {
    ...vaultRegistrySubSlice.reducers,
    ...wantTokenPricesSubSlice.reducers,
    ...contractsAddedToDrizzleSubSlice.reducers,
    ...tokensSubSlice.reducers,
    ...userStatsSubSlice.reducers,
  },
});

export const { name, actions, reducer } = slice;
