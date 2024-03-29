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
const userHoldingsSubSlice = createLoadedDataSubSlice("userHoldings");
const userEarningsSubSlice = createLoadedDataSubSlice("userEarnings");
const strategiesSubSlice = createLoadedDataSubSlice("strategies");

const slice = createSlice({
  name: "vaultsReport",
  initialState: {
    ...vaultSubSlice.initialState,
    ...underlyingTokensSubSlice.initialState,
    ...userHoldingsSubSlice.initialState,
    ...userEarningsSubSlice.initialState,
    ...strategiesSubSlice.initialState,
  },
  reducers: {
    ...vaultSubSlice.reducers,
    ...underlyingTokensSubSlice.reducers,
    ...userHoldingsSubSlice.reducers,
    ...userEarningsSubSlice.reducers,
    ...strategiesSubSlice.reducers,
  },
});

export const { name, actions, reducer } = slice;
