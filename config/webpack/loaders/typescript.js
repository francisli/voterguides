module.exports = {
  test: /\.(ts|tsx)?(\.erb)?$/,
  use: [
    { loader: 'ts-loader'},
    { loader: 'angular2-template-loader'},
  ]
}
