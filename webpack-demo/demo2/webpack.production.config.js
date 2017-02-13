var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义文件夹路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
	//项目文件夹 可以用文件夹名称 默认会找index.js 也可以使用具体文件名字
	entry: {
		app: path.resolve(APP_PATH, 'index.js'),
		vendors: ['jquery', 'moment']
	},
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader?sourceMap'],
			include: APP_PATH
		}, {
			test: /\.scss$/,
			loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
			include: APP_PATH
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=40000&name=imgs/[hash:8].[name].[ext]'
		}, {
			test: /\.jsx?$/,
			loader: 'babel-loader',
			include: APP_PATH,
			query: {
				presets: ['es2015']
			}
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true}),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
		new HtmlwebpackPlugin({
			title: 'Hello word app'
		}),
		//设置全局变量
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			"window.jquery": "jquery"
		})
	]
}