import { createSlice } from "@reduxjs/toolkit";
import { loadSetting } from "utils/settings";

const nameSpace = "settings";

const initialState = {
  panelOpen: false,
  localCurrency: loadSetting("localCurrency") ?? "USD",
  theme: loadSetting("theme") ?? "Red (Light)",
  vaultSortField: loadSetting("vaultSortField") ?? "Vault name",
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
    themeSelected(state, action) {
      state.theme = action.payload;
    },
    vaultSortFieldSelected(state, action) {
      state.vaultSortField = action.payload;
    },
  },
});

export const { name, actions, reducer } = slice;
export { nameSpace };
