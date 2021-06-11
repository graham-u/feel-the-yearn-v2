import { createSlice } from "@reduxjs/toolkit";
import { camelCase } from "lodash";

// Key should be pluralised description of what is being fetch / stored, e.g. vaults, underlyingTokens.
function createLoadedDataSubSlice(key) {
  const fetchReducerName = camelCase(`fetch ${key}`);
  const successReducerName = camelCase(`fetch ${key}Success`);
  const failureReducerName = camelCase(`fetch ${key}Failure`);

  const subSlice = {
    initialState: {
      [key]: {
        data: {},
        loading: false,
        loaded: false,
        error: false,
      },
    },
    reducers: {
      [fetchReducerName](state) {
        state[key].loading = true;
        state[key].error = false;
      },
      [successReducerName](state, action) {
        // this function depends upon action payload being keyed by key parameter passed above.
        state[key].data = action.payload[key];
        state[key].loading = false;
        state[key].loaded = true;
      },
      [failureReducerName](state) {
        state[key].loading = false;
        state[key].error = true;
      },
    },
  };

  return subSlice;
}

const vaultSubSlice = createLoadedDataSubSlice("vaults");
const underlyingTokensSubSlice = createLoadedDataSubSlice("underlyingTokens");
const userPositionsSubSlice = createLoadedDataSubSlice("userPositions");

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
