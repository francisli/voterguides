const { environment, config } = require('@rails/webpacker')
const { resolve } = require('path')
const typescript = require('./loaders/typescript')
const webpack = require('webpack')

environment.loaders.append('typescript', typescript)

//// add html loader so we can use external html templates compiled into the bundle
environment.loaders.append('html', {
  test: /\.html$/,
  loader: 'html-loader'
})

//// reconfigure sass loader so we can use external scss files compiled into the bundle
const sassLoader = environment.loaders.get('sass')
sassLoader.use.shift()
sassLoader.use.shift()
sassLoader.use.unshift('to-string-loader')

//// fix "the request of a dependency is an expression" warning
//// https://github.com/angular/angular/issues/20357
environment.plugins.prepend(
  'ContextReplacementPlugin',
  new webpack.ContextReplacementPlugin(
    /\@angular(\\|\/)core(\\|\/)fesm5/,
    resolve(config.source_path),
    {}
  )
)

module.exports = environment
