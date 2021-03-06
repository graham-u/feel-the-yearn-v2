import { ThemedLink as Link } from "components/Link";

function TokenLink({ address, linkText, titleText }) {
  const url = `https://etherscan.io/address/${address}`;
  return (
    <Link href={url} title={titleText} variant="body1">
      {linkText}
    </Link>
  );
}

export default TokenLink;
