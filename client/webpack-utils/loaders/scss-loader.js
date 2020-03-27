
module.exports = {
    test: /\.scss$/,
    use: [
        'style-loader',
        'css-loader',
        {
            loader: "sass-loader",
            options: {
                includePaths: ['./src/styles']
            }
        }
    ]
};