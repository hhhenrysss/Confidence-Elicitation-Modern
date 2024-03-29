const path = require('path');

module.exports = {
    mode: "production",
    entry: "./frontend/index.js",
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