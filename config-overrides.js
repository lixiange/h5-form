const {
  override,
  fixBabelImports,
  addWebpackPlugin,
  addPostcssPlugins,
} = require("customize-cra");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = override(
  //antd-mobile 按需加载
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: "css",
  }),
  //添加post-css 插件
  addPostcssPlugins([
    require("autoprefixer")(),
    require("postcss-aspect-ratio-mini")(),
    require("postcss-px-to-viewport")({
      viewportWidth: 375, // (Number) The width of the viewport.
      viewportHeight: 662,
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: "vw", // (String) Expected units.
      selectorBlackList: [], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: true, // (Boolean) Allow px to be converted in media queries.
    }),
    require("postcss-write-svg")({
      utf8: false,
    }),
  ]),
  process.argv[2] === "analysis" && addWebpackPlugin(new BundleAnalyzerPlugin())
);
