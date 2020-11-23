import { createSlice } from "@reduxjs/toolkit";

const nameSpace = "settings";

const initialState = {
  panelOpen: false,
};

const slice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    panelToggled(state) {
      state.panelOpen = !state.panelOpen;
    },
  },
});

const selectors = {
  getControlPanelOpen(state) {
    return state[nameSpace].panelOpen;
  },
};

export const { name, actions, reducer } = slice;
export { selectors };
