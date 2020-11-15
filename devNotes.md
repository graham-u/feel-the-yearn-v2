For debugging redundant rendering issues, add the following code to the top of _app.js

```
import whyDidYouRender from '@welldone-software/why-did-you-render';
```

```
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[require("react-redux/lib"), "useSelector"]],
  });
}
```
