const path = require('path');
// var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
	entry: './src/js/scripts.js',
	output: {
		publicPath: "dist/js",
		path: path.join(__dirname, "dist/js/"),
		filename: "bundle.js"
	},
	mode: devMode ? 'development' : 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader", 
				options: {
					presets: ["env"]
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader, 
						options: {
							publicPath: '../css'
						}
					},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.pug$/,
				loaders: [
					"file-loader?name=../[name].html",
					"extract-loader",
					"html-loader",
					"pug-html-loader"
				]
			}
		]
	},
	devServer: {
		publicPath: "/js"
	},
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "../css/[name].css"
		})
	]
};