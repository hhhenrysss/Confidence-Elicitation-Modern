module.exports = {
    mode: "production",
    entry: "index.js",
    output: {
        path: ".",
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
            },
        ]
    }
};