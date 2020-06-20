const merge = require("webpack-merge")
const commonMod = require("./webpack.common.config")

module.exports = (env) => {
  const common = commonMod(env);
  return merge(common, {
    mode: "development",
    watch: true,
    devtool: 'inline-source-map',
  })
};