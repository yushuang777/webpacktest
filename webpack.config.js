const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development', // 指定为开发模式
  // 入口文件
  entry: {
    main: './src/main.js',
  },
  // 出口文件
  output: {
    // 输出到dist文件夹(打包自动生成)
    path: path.resolve(__dirname, 'dist'), // __dirname：表示当前文件的绝对路径(根目录)
    // 输出文件名在dist文件夹里的js文件夹的chunk.js下
    filename: 'js/chunk-[contenthash].js', // 使用由生成的内容产生的 hash
    clean: true, // 自动覆盖之前打包后的文件
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 选择模板文件
      template: './public/index.html', // 指定模板文件
      // 打包以后的名称
      filename: 'index.html',
      // js插入到body
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // 正则匹配css文件
        use: ['style-loader', 'css-loader'], // 注意顺序！是从后往前加载的（即先加载css-loader，再加载style-loader）
      },
      {
        test: /\.less$/, // 正则匹配css文件
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            // 部分css3属性需要通过postcss-loader和postcss-preset-env才能添加浏览器兼容性前缀，以确保在不同浏览器上的一致性
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
        ],
      },
      {
        test: /\.(pngljpglgifljpeglwebp|svglico)$/,
        type: 'asset', // 使用asset榄块
        generator: {
          //生成文件
          // 输出文件名
          filename: 'img/[name].[hash:6][ext]',
        },
      },
      {
        test: /\.js$/, // 正则匹配js文件
        loader: 'babel-loader',
        // // 低级版本babel，高级版可以直接在根目录创建一个babel.config.js
        // test: /\.js$/, // 正则匹配js文件
        // use: {
        //   loader: 'babel-loader', //使用babel-loader
        //   options: {
        //     presets: ['@babel/preset-env'],
        //   },
        // },
      },
    ],
  },
};
