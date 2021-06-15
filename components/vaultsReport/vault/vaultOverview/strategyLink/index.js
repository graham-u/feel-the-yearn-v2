import { ThemedLink as Link } from "components/Link";

function StrategyLink({ address, linkText, titleText }) {
  const url = `https://etherscan.io/address/${address}#code`;
  return (
    <Link href={url} title={titleText} variant="body1">
      {linkText}
    </Link>
  );
}

export default StrategyLink;
