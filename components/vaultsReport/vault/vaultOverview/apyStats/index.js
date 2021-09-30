import Typography from "@material-ui/core/Typography";
import ReportLabel from "components/vaultsReport/vault/reportLabel";

function ApyStats({ APYData }) {
  const growthResult = APYData?.recommended
    ? APYData.recommended.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 2,
      })
    : "Missing";

  return (
    <>
      <ReportLabel>APY</ReportLabel>
      <Typography variant="body1">{growthResult}</Typography>
    </>
  );
}

export default ApyStats;
