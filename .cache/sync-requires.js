const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-index-js": hot(preferDefault(require("/Users/vaibhavyadaram/Documents/projects/shopify/shoppies/src/pages/index.js")))
}

