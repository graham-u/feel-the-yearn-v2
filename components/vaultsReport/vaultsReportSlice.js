import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vaults: [],
  loading: false,
  error: null,
};

const vaultsReportSlice = createSlice({
  name: "vaultsReport",
  initialState,
  reducers: {
    getVaultsStart(state) {
      state.loading = true;
    },
    getVaultsSuccess(state, action) {
      console.log(state, action);
      state.vaults = action.payload;
      state.loading = false;
    },
    getVaultsFail(error) {
      state.loading = false;
      state.error = error;
    },
  },
});

const {
  getVaultsStart,
  getVaultsSuccess,
  getVaultsFail,
} = vaultsReportSlice.actions;

function fetchVaults() {
  return async function fetchVaultsThunk(dispatch) {
    dispatch(getVaultsStart());
    let vaults;

    try {
      vaults = await fetch("https://api.yearn.tools/vaults").then((response) =>
        response.json()
      );
    } catch (e) {
      dispatch(getVaultsFail(e.toString()));
      return;
    }

    dispatch(getVaultsSuccess(vaults));
  };
}

export { vaultsReportSlice, fetchVaults };

export default vaultsReportSlice.reducer;
