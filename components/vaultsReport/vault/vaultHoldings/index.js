import {
  getVaultHoldings,
  getVaultWantToken,
  getVaultFiatValue,
} from "components/vaultsReport/selectors";
import ReportLabel from "components/vaultsReport/vault/reportLabel";
import TokenAndFiatBalance from "components/vaultsReport/vault/tokenAndFiatBalance";
import { useSelector } from "react-redux";

function VaultHoldings({ vault }) {
  const { address: vaultAddress } = vault;

  const tokenHoldings = useSelector((state) => getVaultHoldings(state, vaultAddress));
  const fiatValue = useSelector((state) => getVaultFiatValue(state, vaultAddress));
  const wantToken = useSelector((state) => getVaultWantToken(state, vaultAddress));

  return (
    <>
      <ReportLabel>Vault holdings</ReportLabel>
      <TokenAndFiatBalance tokenBalance={tokenHoldings} fiatBalance={fiatValue} token={wantToken} />
    </>
  );
}

export default VaultHoldings;
