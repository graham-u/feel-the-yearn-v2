import { getVaultUnderlyingToken } from "components/vaultsReport/selectors";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import TokenAndUSDCBalance from "components/vaultsReport/vault/tokenAndUSDCBalance";
import { getVaultBalance } from "components/vaultsReport/vault/vaultHoldings/selectors";
import { useSelector } from "react-redux";

function VaultHoldings({ vaultAddress }) {
  const vaultBalance = useSelector((state) => getVaultBalance(state, vaultAddress));
  const underlyingToken = useSelector((state) => getVaultUnderlyingToken(state, vaultAddress));

  return (
    <>
      <ReportLabel>Vault holdings</ReportLabel>
      <TokenAndUSDCBalance
        tokenBalance={vaultBalance.amount}
        usdcBalance={vaultBalance.amountUsdc}
        token={underlyingToken}
      />
    </>
  );
}

export default VaultHoldings;
