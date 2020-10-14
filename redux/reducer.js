import { combineReducers } from "redux";
import vaultsReportReducer from "components/vaultsReport/vaultsReportSlice";

export default combineReducers({
  vaultsReport: vaultsReportReducer,
});
