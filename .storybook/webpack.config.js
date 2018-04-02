module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader'
          }
        ]

      },
      {
        test: /\.(svg|gif|jpg|png|woff|woff2|ttf|eot)$/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },
}