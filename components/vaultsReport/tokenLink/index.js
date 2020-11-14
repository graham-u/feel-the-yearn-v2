import Link from "@material-ui/core/Link";

function TokenLink({ address, linkText, titleText }) {
  const url = `https://etherscan.io/address/${address}`;
  return (
    <Link href={url} title={titleText}>
      {linkText}
    </Link>
  );
}

export default TokenLink;
