import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import path from "path";

const styleExtractor = new ExtractTextPlugin({
  filename: "[name].css",
  allChunks: true
});
const plugins = [styleExtractor];

if (process.env.NODE_ENV === "production") {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "docs"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".csv", ".png", ".pdf"]
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.json$/, use: "json-loader" },
      { test: /\.csv$/, use: "dsv-loader" },
      {
        test: /\.css$/,
        use: styleExtractor.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /favicon\.png$/,
        loader: "file-loader",
        options: { name: "favicon.png" }
      },
      {
        test: /PokeRPG-Base-Stat-Info\.pdf$/,
        loader: "file-loader",
        options: { name: "PokeRPG-Base-Stat-Info.pdf" }
      }
    ]
  },
  plugins
};
