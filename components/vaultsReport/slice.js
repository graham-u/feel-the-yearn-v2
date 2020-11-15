import { createSlice } from "@reduxjs/toolkit";

const vaultRegistryInitialState = {
  vaultRegistry: {
    vaults: [],
    loading: false,
    error: null,
  },
};

const vaultRegistryReducers = {
  fetchVaults(state) {
    state.vaultRegistry.loading = true;
    state.vaultRegistry.error = false;
    state.vaultRegistry.vaults = [];
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

const slice = createSlice({
  name: "vaultsReport",
  initialState: vaultRegistryInitialState,
  reducers: vaultRegistryReducers,
});

export const { name, actions, reducer } = slice;
