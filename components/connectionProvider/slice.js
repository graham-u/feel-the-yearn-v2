import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  address: null,
};

const slice = createSlice({
  name: "connectionProvider",
  initialState,
  reducers: {
    connected(state) {
      state.connected = true;
    },
    addressChanged(state, action) {
      state.address = action.payload;
    },
  },
});

export const { name, actions, reducer } = slice;
