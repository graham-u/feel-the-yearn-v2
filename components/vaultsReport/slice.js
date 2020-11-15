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
      state.vaultRegistry.vaults = action.payload;
      state.vaultRegistry.loading = false;
    },
    fetchVaultsFailure(state, error) {
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
    fetchWantTokenPricesFailure(state) {
      state.wantTokenPrices.loading = false;
      state.wantTokenPrices.error = error;
    },
  },
};

const slice = createSlice({
  name: "vaultsReport",
  initialState: {
    ...vaultRegistrySubSlice.initialState,
    ...wantTokenPricesSubSlice.initialState,
    ...contractsAddedToDrizzleSubSlice.initialState,
  },
  reducers: {
    ...vaultRegistrySubSlice.reducers,
    ...wantTokenPricesSubSlice.reducers,
    ...contractsAddedToDrizzleSubSlice.reducers,
  },
});

export const { name, actions, reducer } = slice;
