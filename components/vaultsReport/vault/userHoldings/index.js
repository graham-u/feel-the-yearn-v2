import {
  getVaultUnderlyingToken,
  getUserPositionsLoading,
} from "components/vaultsReport/selectors";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import TokenAndUSDCBalance from "components/vaultsReport/vault/tokenAndUSDCBalance";
import { getUserBalance } from "components/vaultsReport/vault/userHoldings/selectors";
import { useSelector } from "react-redux";

function UserHoldings({ vaultAddress }) {
  const userPositionsLoading = useSelector(getUserPositionsLoading);

  const userBalance = useSelector((state) => getUserBalance(state, vaultAddress));
  const underlyingToken = useSelector((state) => getVaultUnderlyingToken(state, vaultAddress));

  return (
    <>
      <ReportLabel>User holdings</ReportLabel>
      {userPositionsLoading ? (
        "User positions loading"
      ) : (
        <TokenAndUSDCBalance
          tokenBalance={userBalance.amount}
          usdcBalance={userBalance.amountUsdc}
          token={underlyingToken}
        />
      )}
    </>
  );
}

export default UserHoldings;
