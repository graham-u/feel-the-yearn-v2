import { Container } from "@material-ui/core/";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Header from "components/pageContainer/header";

const usePageStyles = makeStyles((theme) => {
  return {
    root: {
      background: theme.palette.background.default,
    },
  };
});

function PageContainer({ children }) {
  const pageClasses = usePageStyles();

  return (
    <div className={pageClasses.root}>
      <Container maxWidth="lg">
        <header>
          <Header />
        </header>
        {children}
      </Container>
    </div>
  );
}

export default PageContainer;
