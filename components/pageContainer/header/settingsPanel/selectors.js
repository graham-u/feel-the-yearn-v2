import { nameSpace } from "components/pageContainer/header/settingsPanel/slice";

const getSettingsPanelOpen = (state) => state[nameSpace].panelOpen;
const getLocalCurrency = (state) => state[nameSpace].localCurrency;

export { getSettingsPanelOpen, getLocalCurrency };
