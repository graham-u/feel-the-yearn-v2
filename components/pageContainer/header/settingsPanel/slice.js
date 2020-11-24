import { createSlice } from "@reduxjs/toolkit";
import { loadSetting } from "utils/settings";

const nameSpace = "settings";

const initialState = {
  panelOpen: false,
  localCurrency: loadSetting("localCurrency") ?? "USD",
};

const slice = createSlice({
  name: nameSpace,
  initialState,
  reducers: {
    panelToggled(state) {
      state.panelOpen = !state.panelOpen;
    },
    localCurrencySelected(state, action) {
      state.localCurrency = action.payload;
    },
  },
});

export const { name, actions, reducer } = slice;
export { nameSpace };
