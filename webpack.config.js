let path = require('path');

let MiniCssExtractPlugin = require('mini-css-extract-plugin');// 抽离css的插件


// development production
module.exports = {
  mode: 'production',  //生产模式，会压缩代码，development不会压缩代码
  entry: './src/index.js',  //虽然我们打包的是scss，但是入口依然还得是js
  output: {
    path: path.resolve(__dirname, 'build') //打包后的出口
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "buildElement.css",  //打包后的css文件
    })
  ],
  //loader链
  module: {
    rules: [
      
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: "resolve-url-loader"  //因为scss-loader没有重写url的功能，所以必须安装这个
          },
          {
            loader: "css-unicode-loader"
          },
          {
            loader: "sass-loader", // 将 Sass 编译成 CSS
            options: { sourceMap: true }  //必须要写
          }
        ]
      },
      {
        test: /\.(woff|woff2?|svg|ttf|eot)$/,
        use:[
             {loader:'file-loader',options:{outputPath: 'iconfont',limit:10000}}//项目设置打包到dist下的fonts文件夹下
          ]
      }
    ]
  }
}