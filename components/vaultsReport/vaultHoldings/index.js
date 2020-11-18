import ContractData from "components/vaultsReport/contractData";
import ReportLabel from "components/vaultsReport/reportLabel";
import TokenAndFiatBalance from "components/vaultsReport/tokenAndFiatBalance";

function VaultHoldings({ vault }) {
  const { address: vaultAddress, tokenAddress } = vault;

  const contractConfigs = [
    {
      contractKey: vaultAddress,
      method: "balance",
    },
  ];

  return (
    <ContractData
      contractConfigs={contractConfigs}
      render={(rawBalance) => {
        return (
          <>
            <ReportLabel>Vault holdings</ReportLabel>
            <TokenAndFiatBalance rawBalance={rawBalance} tokenAddress={tokenAddress} />
          </>
        );
      }}
    />
  );
}

export default VaultHoldings;
