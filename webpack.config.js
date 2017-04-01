const path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "lib", "index.js"),
    output: {
        filename: "validator.js",
        library: "validator",
        libraryTarget: "umd",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};