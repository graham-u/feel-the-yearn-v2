import Link from "@material-ui/core/Link";

function StrategyLink({ address, linkText, titleText }) {
  const url = `https://etherscan.io/address/${address}#code`;
  return (
    <Link href={url} title={titleText} variant="subtitle2" display="block" noWrap>
      {linkText}
    </Link>
  );
}

export default StrategyLink;
