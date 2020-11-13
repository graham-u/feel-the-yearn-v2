import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vaults: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "vaultsReport",
  initialState,
  reducers: {
    fetchVaults(state) {
      state.loading = true;
      state.error = false;
      state.data = [];
    },
    fetchVaultsSuccess(state, action) {
      state.vaults = action.payload;
      state.loading = false;
    },
    fetchVaultsFailure(state, error) {
      state.loading = false;
      state.error = error;
    },
  },
});

export const { name, actions, reducer } = slice;
