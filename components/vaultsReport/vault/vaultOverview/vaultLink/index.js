import { ThemedLink as Link } from "components/Link";

function VaultLink({ address, linkText, titleText }) {
  const url = `https://etherscan.io/address/${address}#code`;
  return (
    <Link href={url} title={titleText} variant="h5">
      {linkText}
    </Link>
  );
}

export default VaultLink;
