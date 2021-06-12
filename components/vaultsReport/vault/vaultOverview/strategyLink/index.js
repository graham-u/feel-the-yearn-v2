import { ThemedLink as Link } from "components/Link";

function StrategyLink({ strategy, address, linkText, titleText }) {
  const url = `https://etherscan.io/address/${address}#code`;
  return (
    <Link href={url} title={titleText} variant="body1" display="block" noWrap>
      {linkText}
    </Link>
  );
}

export default StrategyLink;
