import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  panelOpen: false,
};

const slice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    panelToggled(state) {
      state.panelOpen = !state.panelOpen;
    },
  },
});

export const { name, actions, reducer } = slice;
