import { useAddress } from "components/connectionProvider/hooks";
import VaultsReport from "components/vaultsReport/index";
import LoadingStatus from "components/vaultsReport/loadingStatus";
import { getLoadingComplete } from "components/vaultsReport/selectors";
import { actions } from "components/vaultsReport/slice";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import NoSSR from "react-no-ssr";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const userAddress = useAddress();

  const loadingFinished = useSelector((state) => getLoadingComplete(state, userAddress));

  useEffect(() => {
    dispatch(actions.fetchVaults());
    dispatch(actions.fetchUnderlyingTokens());
    dispatch(actions.fetchStrategies());
  }, []);

  useEffect(() => {
    if (!isEmpty(userAddress)) {
      dispatch(actions.fetchUserHoldings({ userAddress }));
      dispatch(actions.fetchUserEarnings({ userAddress }));
    }
  }, [userAddress]);

  if (!loadingFinished) {
    return <LoadingStatus />;
  }

  return (
    <NoSSR>
      <VaultsReport />
    </NoSSR>
  );
}

export default Home;
