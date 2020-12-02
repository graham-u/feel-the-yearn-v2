import { nameSpace } from "components/pageContainer/header/settingsPanel/slice";

const getSettingsPanelOpen = (state) => state[nameSpace].panelOpen;
const getLocalCurrency = (state) => state[nameSpace].localCurrency;
const getCurrentThemeName = (state) => state[nameSpace].theme;

export { getSettingsPanelOpen, getLocalCurrency, getCurrentThemeName };
