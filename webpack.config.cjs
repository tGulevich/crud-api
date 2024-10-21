const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.join(__dirname, "src", "index.ts"),
  target: "node",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
//   externals: 'uuid',
//   plugins: [new ESLintPlugin({ extensions: "ts" })],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
      },
    ],
  },
};