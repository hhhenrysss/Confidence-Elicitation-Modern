const path = require('path');

module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "dist.js"
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