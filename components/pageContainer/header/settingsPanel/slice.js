import { createSlice } from "@reduxjs/toolkit";
import { loadSetting } from "utils/settings";

const nameSpace = "settings";

const initialState = {
  panelOpen: loadSetting("settingsPanelOPen") ?? true,
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
