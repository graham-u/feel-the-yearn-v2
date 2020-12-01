For debugging redundant rendering issues, add the following code to the top of _app.js

```
import whyDidYouRender from '@welldone-software/why-did-you-render';
```

```
if (!isUndefined(window) && process.env.NODE_ENV === "development") {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[require("react-redux/lib"), "useSelector"]],
  });
}
```

To monitor breakpoints, use the following code in a high level component.
```
import useMediaQuery from "@material-ui/core/useMediaQuery";
```

```
  ["xs", "sm", "md", "lg", "xl"].forEach((breakpoint) => {
    const matches =
      useMediaQuery((theme) => theme.breakpoints.only(breakpoint)) && console.log(breakpoint);
  });

```
