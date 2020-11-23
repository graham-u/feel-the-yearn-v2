import { nameSpace } from "components/pageContainer/header/controlPanel/slice";

const getControlPanelOpen = (state) => state[nameSpace].panelOpen;
const getLocalCurrency = (state) => state[nameSpace].localCurrency;

export { getControlPanelOpen, getLocalCurrency };
