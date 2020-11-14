import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from "next/router";

const styles = {
  selected: {
    fontWeight: "bold",
  },
};

function PageAwareLink({ href, children, classes }) {
  const router = useRouter();

  let className = children.props.className || "";
  if (router.pathname === href) {
    className = `${className} ${classes.selected}`;
  }

  return <Link href={href}>{React.cloneElement(children, { className })}</Link>;
}

export default withStyles(styles)(PageAwareLink);
