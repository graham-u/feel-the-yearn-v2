import IconTip from "components/vaultsReport/iconTip";
import ReportLabel from "components/vaultsReport/reportLabel";
import TokenAndFiatBalance from "components/vaultsReport/tokenAndFiatBalance";
import { getUserStatsSelector } from "components/vaultsReport/userStats/selectors";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

function UserStats({ vault }) {
  const getUserStats = useMemo(() => getUserStatsSelector(), []);
  const userStats = useSelector((state) => getUserStats(state, vault.address));

  const lifetimeEarningsRawBalance = userStats ? userStats.earnings : null;

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
        rawBalance={lifetimeEarningsRawBalance}
        tokenAddress={vault.tokenAddress}
        tokenDisplayPrecision={4}
      />
    </>
  );
}

export default UserStats;
