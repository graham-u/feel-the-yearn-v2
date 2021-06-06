import Typography from "@material-ui/core/Typography";

function ApyStats({ APYData }) {
  const growthResult = APYData?.recommended
    ? APYData.recommended.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 2,
      })
    : "Missing";

  return (
    <>
      <Typography variant="body1">APY: {growthResult}</Typography>
    </>
  );
}

export default ApyStats;
