import Typography from "@material-ui/core/Typography";
import { pure } from "recompose";

function ReportLabel({ children }) {
  return (
    <Typography color={"textSecondary"} variant="subtitle2">
      {children}
    </Typography>
  );
}

export default pure(ReportLabel);
