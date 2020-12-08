import { nameSpace } from "components/pageContainer/header/settingsPanel/slice";

const getSettingsPanelOpen = (state) => state[nameSpace].panelOpen;
const getLocalCurrency = (state) => state[nameSpace].localCurrency;
const getCurrentThemeName = (state) => state[nameSpace].theme;
const getVaultSortField = (state) => state[nameSpace].vaultSortField;

export { getSettingsPanelOpen, getLocalCurrency, getCurrentThemeName, getVaultSortField };
