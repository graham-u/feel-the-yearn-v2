import { useAddress } from "components/connectionProvider/hooks";
import {
  getVaultsLoading,
  getStrategiesLoading,
  getUnderlyingTokensLoading,
  getUserHoldingsLoading,
  getUserEarningsLoading,
} from "components/vaultsReport/selectors";
import { map } from "lodash";
import { useSelector } from "react-redux";

function LoadingStatus() {
  const userAddress = useAddress();

  let statuses = {
    vaults: useSelector(getVaultsLoading),
    strategies: useSelector(getStrategiesLoading),
    "underlying tokens": useSelector(getUnderlyingTokensLoading),
    "user holdings": useSelector(getUserHoldingsLoading),
    "user earnings": useSelector(getUserEarningsLoading),
  };

  return map(statuses, (loading, type) => {
    return (
      <p key={type} style={{ color: loading ? "Red" : "Green" }}>
        {loading ? "Loading " : "Loaded "} {type}
      </p>
    );
  });
}

export default LoadingStatus;
