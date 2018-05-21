const path = require('path');
// var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "styles.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry: './src/js/scripts.js',
    output: {
        publicPath: "",
        path: path.join(__dirname, "/dist/js/"),
        filename: "bundle.js"
	},
	watch: true,
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
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader?url=false', 'sass-loader']
				})
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
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	plugins: [
		new ExtractTextPlugin('../css/main.css')
	]
};

// const path = require('path');
// var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// module.exports = {
//     output: {
//         publicPath: "./dist/",
//         path: path.join(__dirname, "/js/"),
//         filename: "bundle.js"
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: "babel-loader",
//                 query: {
//                     presets: ["env"]
//                 }
//             },
//             {
//                 test: /\.vue$/,
//                 loader: 'vue-loader'
//             }
//         ]
// 	},
// 	plugins: [
// 		new HardSourceWebpackPlugin()
// 	]
// };