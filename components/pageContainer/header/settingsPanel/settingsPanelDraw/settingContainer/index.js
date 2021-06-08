import makeStyles from "@material-ui/core/styles/makeStyles";

const useSettingContainerStyles = makeStyles({
  root: {
    marginBottom: "0.75rem",
  },
});

function SettingContainer({ children }) {
  const settingContainerClasses = useSettingContainerStyles();

  return <div className={settingContainerClasses.root}>{children}</div>;
}

export default SettingContainer;
