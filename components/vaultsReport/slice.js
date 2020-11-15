import { createSlice } from "@reduxjs/toolkit";

const vaultRegistryInitialState = {
  vaultRegistry: {
    vaults: [],
    loading: false,
    error: false,
  },
};

const vaultRegistryReducers = {
  fetchVaults(state) {
    state.vaultRegistry.loading = true;
    state.vaultRegistry.error = false;
  },
  fetchVaultsSuccess(state, action) {
    state.vaultRegistry.vaults = action.payload;
    state.vaultRegistry.loading = false;
  },
  fetchVaultsFailure(state, error) {
    state.vaultRegistry.loading = false;
    state.vaultRegistry.error = error;
  },
};

const wantTokenPricesInitialState = {
  wantTokenPrices: {
    prices: {},
    loading: false,
    error: null,
  },
};

const wantTokenPricesReducers = {
  fetchWantTokenPrices(state) {
    state.wantTokenPrices.loading = true;
    state.wantTokenPrices.error = false;
  },
  fetchWantTokenPricesSuccess(state, action) {
    state.wantTokenPrices.prices = action.payload;
    state.wantTokenPrices.loading = false;
  },
  fetchWantTokenPricesFailure(state) {
    state.wantTokenPrices.loading = false;
    state.wantTokenPrices.error = error;
  },
};

const slice = createSlice({
  name: "vaultsReport",
  initialState: {
    ...vaultRegistryInitialState,
    ...wantTokenPricesInitialState,
  },
  reducers: { ...vaultRegistryReducers, ...wantTokenPricesReducers },
});

export const { name, actions, reducer } = slice;
