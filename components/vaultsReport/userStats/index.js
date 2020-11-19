import Tooltip from "@material-ui/core/Tooltip";
import ReportLabel from "components/vaultsReport/reportLabel";
import TokenAndFiatBalance from "components/vaultsReport/tokenAndFiatBalance";
import { getUserStatsSelector } from "components/vaultsReport/userStats/selectors";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

function UserStats({ vault }) {
  const getUserStats = useMemo(() => getUserStatsSelector(), []);
  const userStats = useSelector((state) => getUserStats(state, vault.address));

  const lifetimeEarningsRawBalance = userStats ? userStats.earnings : null;

  if (lifetimeEarningsRawBalance === null) {
    return null;
  }

  return (
    <>
      <ReportLabel>
        Lifetime earnings
        <Tooltip
          title="Fiat value as of current conversion rate. Does not take into account rate at time of deposits, withdrawals or transfers."
          arrow
        >
          <HelpOutlineIcon fontSize={"inherit"} color={"primary"} />
        </Tooltip>
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
