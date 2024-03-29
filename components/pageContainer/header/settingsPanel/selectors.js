import { nameSpace } from "components/pageContainer/header/settingsPanel/slice";

const getSettingsPanelOpen = (state) => state[nameSpace].panelOpen;
const getCurrentThemeName = (state) => state[nameSpace].theme;
const getVaultSortField = (state) => state[nameSpace].vaultSortField;
const getVaultVisibilitySetting = (state) => state[nameSpace].vaultVisibility;

export { getSettingsPanelOpen, getCurrentThemeName, getVaultSortField, getVaultVisibilitySetting };
