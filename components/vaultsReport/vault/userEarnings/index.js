import {
  getVaultUnderlyingToken,
  getUserPositionsLoading,
} from "components/vaultsReport/selectors";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import TokenAndUSDCBalance from "components/vaultsReport/vault/tokenAndUSDCBalance";
import { getUserEarnings } from "components/vaultsReport/vault/userEarnings/selectors";
import { useSelector } from "react-redux";

function UserEarnings({ vaultAddress }) {
  const userPositionsLoading = useSelector(getUserPositionsLoading);

  const userEarnings = useSelector((state) => getUserEarnings(state, vaultAddress));
  const underlyingToken = useSelector((state) => getVaultUnderlyingToken(state, vaultAddress));

  return (
    <>
      <ReportLabel>User earnings</ReportLabel>
      {userPositionsLoading ? (
        "User positions loading"
      ) : (
        <TokenAndUSDCBalance
          tokenBalance={userEarnings.amount}
          usdcBalance={userEarnings.amountUsdc}
          token={underlyingToken}
        />
      )}
    </>
  );
}

export default UserEarnings;
