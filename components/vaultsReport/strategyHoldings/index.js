import ContractData from "components/vaultsReport/contractData";
import ReportLabel from "components/vaultsReport/reportLabel";
import TokenAndFiatBalance from "components/vaultsReport/tokenAndFiatBalance";

function StrategyHoldings({ vault }) {
  const { strategyAddress } = vault;

  const contractConfigs = [
    {
      contractKey: strategyAddress,
      method: "balanceOf",
    },
    {
      contractKey: strategyAddress,
      method: "want",
    },
  ];

  return (
    <ContractData
      contractConfigs={contractConfigs}
      render={(rawBalance, wantTokenAddress) => {
        return (
          <>
            <ReportLabel>Strategy holdings</ReportLabel>
            <TokenAndFiatBalance rawBalance={rawBalance} tokenAddress={wantTokenAddress} />
          </>
        );
      }}
    />
  );
}

export default StrategyHoldings;
