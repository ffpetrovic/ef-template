const path = require('path');

module.exports = {
    output: {
        publicPath: "./dist/",
        path: path.join(__dirname, "/js/"),
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ["env"]
            }
        }]
    }
};