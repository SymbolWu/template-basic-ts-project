const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolve = (dir) => path.resolve(__dirname, "..", dir);
module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "js/bundle.[hash].js",
    path: path.join(__dirname, "../build"),
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: "babel-loader",
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|png|svg|mp3)$/, //正则匹配
        use: {
          //匹配到的使用这个loader
          loader: "url-loader",
          options: {
            //loader 参数
            name: "[name].[ext]", //名字
            limit: 14000, //pic大小小于url 时会变成data json存储在url里
            // outputPath: "img/", //输出文件夹
            // publicPath: "build/img", //打包后引用的url前加上 publicpath
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    // 设置别名
    alias: {
      "@": resolve("src"), // 这样配置后 @ 可以指向 src 目录
    },
  },
};
