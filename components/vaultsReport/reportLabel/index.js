import Typography from "@material-ui/core/Typography";

function ReportLabel({ children }) {
  return (
    <Typography color={"textSecondary"} variant="subtitle2">
      {children}
    </Typography>
  );
}

export default ReportLabel;
