const path = require('path');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    output: {
        publicPath: "./dist/",
        path: path.join(__dirname, "/js/"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env"]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
	},
	plugins: [
		new HardSourceWebpackPlugin()
	]
};