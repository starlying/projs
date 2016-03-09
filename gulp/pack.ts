var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var webpackStream = require('webpack-stream')
var webpack = require('webpack')
var WebpackDevServer = require("webpack-dev-server")

function build(name: string) {
  var arr = name.split('/')
  var filename = _.kebabCase(name.split('/')[0]) + '.js'
  if (arr.length === 3) {
    filename = _.kebabCase(name.split('/')[1]) + '.js'
  }
  var options: any = {
    errorDetails: true,
    debug: false,
    output: {
      filename: filename.toLowerCase()
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!less' }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
  }
  return gulp.src('./' + name + '.js')
    .pipe(webpackStream(options))
    .pipe(gulp.dest('./public/assets/js'))
}

function dev(name: string, callback: () => void) {
  //var filename = name.split('/')[1].substr(0, 3) + '-' + name.split('/')[1].substr(3) + '.js'
  var filename = _.kebabCase(name.split('/')[1]) + '.js'
  var options: any = {
    entry: './' + name + '.js',
    output: {
      path: path.join(__dirname, '../../../public/assets/js'),
      publicPath: "/assets/",
      filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!less' }
      ]
    },
    devtool: "sourcemap",
    debug: true
  }
  var port = 7070

  var compiler = webpack(options)
  return new WebpackDevServer(compiler, {
    stats: {
      colors: true
    },
    historyApiFallback: true
  }).listen(port, "localhost", function(err) {
    if (err) throw err
    callback()
  })
}

gulp.task('pack', function(callback) {
  build('src/index')
})

gulp.task('dev', function(callback) {
  dev('src/index', callback)
})
