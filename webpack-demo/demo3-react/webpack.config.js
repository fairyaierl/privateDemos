var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
		'webpack/hot/only-dev-server',
		path.resolve(APP_PATH, 'index.jsx')
	],
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			include: APP_PATH,
			query: {
				//添加两个presents 使用这两种presets处理js或者jsx文件
				presets: ['es2015', 'react']
			}
		}, {
			test: /.scss$/,
			loaders: ['style-loader', 'css-loader', 'sass-loader']
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new htmlWebpackPlugin({
			title: 'My first react app'
		})
	]
}