import { getVaultUnderlyingToken } from "components/vaultsReport/selectors";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import TokenAndUSDCBalance from "components/vaultsReport/vault/tokenAndUSDCBalance";
import { getUserEarnings } from "components/vaultsReport/vault/userEarnings/selectors";
import { useSelector } from "react-redux";

function UserEarnings({ vaultAddress }) {
  const userEarnings = useSelector((state) => getUserEarnings(state, vaultAddress));
  const underlyingToken = useSelector((state) => getVaultUnderlyingToken(state, vaultAddress));

  return (
    <>
      <ReportLabel>User earnings</ReportLabel>

      <TokenAndUSDCBalance
        tokenBalance={userEarnings.tokenEarnings}
        usdcBalance={userEarnings.usdcEarnings}
        token={underlyingToken}
      />
    </>
  );
}

export default UserEarnings;
