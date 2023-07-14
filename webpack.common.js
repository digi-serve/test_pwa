const path = require("path");
const APP = path.resolve(__dirname);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
   context: APP,
   entry: {
      app: path.join(APP, "src", "js", "app.js"),
   },
   output: {
      // path: path.join(APP, "..", "web", "assets", "app"),
      path: path.join(APP, "src", "js", "assets"),
      filename: "mobile_[name].js",
   },
   module: {
      rules: [
         {
            test: /\.less$/i,
            use: [
               // compiles Less to CSS
               "style-loader",
               "css-loader",
               "less-loader",
            ],
         },
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader?url=false"],
         },
         {
            test: /\.(eot|woff|woff2|svg|ttf)([?]?.*)$/,
            use: ["url-loader?limit=10000000"],
         },
         {
            test: /\.(f7|jsx)$/,
            use: ["babel-loader", "framework7-loader"],
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.join(APP, "webpack", "index.ejs"),
         filename: path.join(APP, "src", "index.html"), // "../../../web/assets/index.html",
         inject: "body",
         publicPath: "/js/assets",
      }),
      new CleanWebpackPlugin(),
   ],
   resolve: {
      alias: {
         assets: path.resolve(__dirname, "src"),
      },
   },
   optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
         cacheGroups: {
            vendor: {
               test: /[\\/]node_modules[\\/]/,
               name: "vendors",
               chunks: "all",
            },
         },
      },
   },
};
