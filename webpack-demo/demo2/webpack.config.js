var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义文件夹路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
	//项目文件夹 可以用文件夹名称 默认会找index.js 也可以使用具体文件名字
	entry:{
		app: path.resolve(APP_PATH, 'index.js'),
		mobile: path.resolve(APP_PATH, 'mobile.js'),
		vendors: ['jquery', 'moment']
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].[hash].js',
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
	},
	devtool: 'cheap-module-eval-source-map',
	module: {
		preLoaders: [{
			test: /\.jsx?$/,
			include: APP_PATH,
			loader: 'jshint-loader'
		}],
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
			loaders: ['url-loader?limit=400&name=imgs/[hash:8].[name].[ext]', 'file-loader']
		}, {
			test: /\.jsx?$/,
			loader: 'babel-loader',
			include: APP_PATH,
			query: {
				presets: ['es2015']
			}
		}]
	},
	jshint: {
		"esnext": true
	},
	plugins: [
		//生成多个html页面
		//创建了两个HtmlWebpackPlugin的实例，生成两个页面
		new HtmlwebpackPlugin({
			title: 'Hello World app',
			template: path.resolve(TEM_PATH, 'index.html'),
			filename: 'index.html',
			chunks: ['app', 'vendors'],
			inject: 'body'
		}),
		new HtmlwebpackPlugin({
			title: 'Hello Mobile app',
			template: path.resolve(TEM_PATH, 'mobile.html'),
			filename: 'mobile.html',
			chunks: ['mobile', 'vendors'],
			inject: 'body'
		}),
		//设置全局变量
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			"window.jquery": "jquery"
		})
	]
}