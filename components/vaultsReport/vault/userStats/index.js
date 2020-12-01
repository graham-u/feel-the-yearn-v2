import {
  getVaultWantToken,
  getUserEarnings,
  getUserEarningsFiatValue,
} from "components/vaultsReport/selectors";
import IconTip from "components/vaultsReport/vault/iconTip";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import TokenAndFiatBalance from "components/vaultsReport/vault/tokenAndFiatBalance";
import { useSelector } from "react-redux";

function UserStats({ vault }) {
  const { address: vaultAddress } = vault;

  const userLifetimeEarnings = useSelector((state) => getUserEarnings(state, vaultAddress));
  const fiatValue = useSelector((state) => getUserEarningsFiatValue(state, vaultAddress));
  const wantToken = useSelector((state) => getVaultWantToken(state, vaultAddress));

  return (
    <>
      <ReportLabel>
        Lifetime earnings
        <IconTip>
          Fiat value as of current conversion rate. Does not take into account rate at time of
          deposits, withdrawals or transfers.
        </IconTip>
      </ReportLabel>
      <TokenAndFiatBalance
        tokenBalance={userLifetimeEarnings}
        fiatBalance={fiatValue}
        token={wantToken}
        fiatMinShow={0.01}
        tokenMinShow={0.00001}
        tokenDisplayPrecision={4}
      />
    </>
  );
}

export default UserStats;
