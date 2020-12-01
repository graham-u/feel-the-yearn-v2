import {
  getVaultWantToken,
  getUserHoldings,
  getUserFiatValue,
} from "components/vaultsReport/selectors";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import TokenAndFiatBalance from "components/vaultsReport/vault/tokenAndFiatBalance";
import { useSelector } from "react-redux";

function UserHoldings({ vault }) {
  const { address: vaultAddress } = vault;

  const userHoldings = useSelector((state) => getUserHoldings(state, vaultAddress));
  const fiatValue = useSelector((state) => getUserFiatValue(state, vaultAddress));
  const wantToken = useSelector((state) => getVaultWantToken(state, vaultAddress));

  return (
    <>
      <ReportLabel>User holdings</ReportLabel>
      <TokenAndFiatBalance
        tokenBalance={userHoldings}
        fiatBalance={fiatValue}
        token={wantToken}
        fiatMinShow={0.01}
        tokenMinShow={0.00001}
        tokenDisplayPrecision={4}
      />
    </>
  );
}

export default UserHoldings;
