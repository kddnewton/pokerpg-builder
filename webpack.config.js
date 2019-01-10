const path = require("path");

module.exports = {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "docs"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".js", ".css", ".csv", ".png", ".pdf"]
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        exclude: /node_modules/
      },
      { test: /\.csv$/, use: "dsv-loader" },
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
  devServer: {
    contentBase: path.join(__dirname, "docs")
  }
};
