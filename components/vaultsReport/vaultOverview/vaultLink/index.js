import Link from "@material-ui/core/Link";

function VaultLink({ address, linkText, titleText }) {
  const url = `https://etherscan.io/address/${address}#code`;
  return (
    <Link href={url} title={titleText} variant="body1">
      {linkText}
    </Link>
  );
}

export default VaultLink;
