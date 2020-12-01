import {
  getStrategyHoldings,
  getStrategyFiatValue,
  getStrategyWantToken,
} from "components/vaultsReport/selectors";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import TokenAndFiatBalance from "components/vaultsReport/vault/tokenAndFiatBalance";
import { useSelector } from "react-redux";

function StrategyHoldings({ vault }) {
  const { strategyAddress } = vault;

  const tokenHoldings = useSelector((state) => getStrategyHoldings(state, strategyAddress));
  const fiatValue = useSelector((state) => getStrategyFiatValue(state, strategyAddress));
  const wantToken = useSelector((state) => getStrategyWantToken(state, strategyAddress));

  return (
    <>
      <ReportLabel>Strategy holdings</ReportLabel>
      <TokenAndFiatBalance tokenBalance={tokenHoldings} fiatBalance={fiatValue} token={wantToken} />
    </>
  );
}

export default StrategyHoldings;
