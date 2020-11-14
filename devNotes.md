For debugging redundant rendering issues, add the following code to the top of _app.js

```
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[require("react-redux/lib"), "useSelector"]],
  });
}
```
