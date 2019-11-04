const path = require('path');

module.exports = {
    mode: "development",
    entry: "./frontend/index.js",
    devtool: "eval-source-map",
    output: {
        path: path.resolve(__dirname, "frontend", "dist"),
        filename: "dist.js",
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },{
                test: /\.txt$/i,
                use: 'raw-loader',
            },
        ]
    }
};