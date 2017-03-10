import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import path from "path";

const styleExtractor = new ExtractTextPlugin("[name].css", { allChunks: true });
const plugins = [styleExtractor];

if (process.env.NODE_ENV === "production") {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".css", ".csv"]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: "babel", exclude: /node_modules/ },
      { test: /\.json$/, loader: "json" },
      { test: /\.png$/, loader: "file" },
      { test: /\.csv$/, loader: "dsv" },
      { test: /\.css$/, loader: styleExtractor.extract("style", "css") },
      { test: /favicon\.png$/, loader: "file", query: { name: "favicon.png" } }
    ]
  },
  plugins: plugins
};
