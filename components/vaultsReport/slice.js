import { createSlice } from "@reduxjs/toolkit";

const vaultSubSlice = {
  initialState: {
    vaults: {
      data: {},
    },
    loading: false,
    loaded: false,
    error: false,
  },
  reducers: {
    fetchVaults(state) {
      state.loading = true;
      state.error = false;
    },
    fetchVaultsSuccess(state, action) {
      const { vaults } = action.payload;
      state.vaults.data = vaults;
      state.loading = false;
      state.loaded = true;
    },
    fetchVaultsFailure(state, action) {
      state.loading = false;
      state.error = true;
    },
  },
};

const underlyingTokensSubSlice = {
  initialState: {
    tokens: {
      data: {},
    },
    loading: false,
    loaded: false,
    error: false,
  },
  reducers: {
    fetchTokens(state) {
      state.tokens.loading = true;
      state.tokens.error = false;
    },
    fetchTokensSuccess(state, action) {
      const { tokens } = action.payload;
      state.tokens.data = tokens;
      state.tokens.loading = false;
      state.tokens.loaded = true;
    },
    fetchTokensFailure(state, action) {
      state.tokens.loading = false;
      state.tokens.error = true;
    },
  },
};

const userPositionsSubSlice = {
  initialState: {
    userPositions: {
      data: {},
      loading: false,
      error: false,
    },
  },
  reducers: {
    fetchUserPositions(state) {
      state.userPositions.loading = true;
      state.userPositions.error = false;
    },
    fetchUserPositionsSuccess(state, action) {
      state.userPositions.data = action.payload;
      state.userPositions.loading = false;
    },
    fetchUserPositionsFailure(state, action) {
      state.userPositions.loading = false;
      state.userPositions.error = true;
    },
  },
};

const slice = createSlice({
  name: "vaultsReport",
  initialState: {
    ...vaultSubSlice.initialState,
    ...underlyingTokensSubSlice.initialState,
    ...userPositionsSubSlice.initialState,
  },
  reducers: {
    ...vaultSubSlice.reducers,
    ...underlyingTokensSubSlice.reducers,
    ...userPositionsSubSlice.reducers,
  },
});

export const { name, actions, reducer } = slice;
