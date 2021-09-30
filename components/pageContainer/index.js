import { Container } from "@material-ui/core/";
import { useTheme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Header from "components/pageContainer/header";
import { Notifications } from "components/pageContainer/notifications";

const useContainerStyles = makeStyles((theme) => {
  const styles = {};

  if (theme?.container?.background) {
    styles.root = {
      background: theme.container.background,
    };
  }

  return styles;
});

function PageContainer({ children }) {
  const theme = useTheme();
  const containerClasses = useContainerStyles();

  return (
    <>
      <style jsx global>
        {`
          body {
            background-color: ${theme.palette.background.default};
          }
        `}
      </style>

      <div>
        <Notifications />
        <Container maxWidth="lg" className={containerClasses.root}>
          <header>
            <Header />
          </header>
          {children}
        </Container>
      </div>
    </>
  );
}

export default PageContainer;
