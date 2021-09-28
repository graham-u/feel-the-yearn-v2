import { getVaultUnderlyingToken, getUserHoldingsLoading } from "components/vaultsReport/selectors";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import TokenAndUSDCBalance from "components/vaultsReport/vault/tokenAndUSDCBalance";
import { getUserBalance } from "components/vaultsReport/vault/userHoldings/selectors";
import { useSelector } from "react-redux";
import normalizedValue from "utils/normalizedValue";

function UserHoldings({ vaultAddress }) {
  const userHoldingsLoading = useSelector(getUserHoldingsLoading);

  const userBalance = useSelector((state) => getUserBalance(state, vaultAddress));
  const underlyingToken = useSelector((state) => getVaultUnderlyingToken(state, vaultAddress));

  userBalance.balance = normalizedValue(userBalance.balance, underlyingToken.decimals);
  userBalance.balanceUsdc = normalizedValue(userBalance.balanceUsdc, 6);

  return (
    <>
      <ReportLabel>User holdings</ReportLabel>
      {userHoldingsLoading ? (
        "User holdings loading"
      ) : (
        <TokenAndUSDCBalance
          tokenBalance={userBalance.balance}
          usdcBalance={userBalance.balanceUsdc}
          token={underlyingToken}
        />
      )}
    </>
  );
}

export default UserHoldings;
