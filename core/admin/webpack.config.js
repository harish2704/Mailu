var path = require("path");
var webpack = require("webpack");
var css = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./assets/app.js",
        vendor: "./assets/vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "static/"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [css.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: [css.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: [css.loader, 'css-loader']
            },
            {
                // Exposes jQuery for use outside Webpack build
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: {
                      exposes: [
                        {
                          globalName: '$',
                          override: true,
                        },
                        {
                          globalName: 'jQuery',
                          override: true,
                        },
                      ] 
                    },               
                }]
            }
        ]
    },
    plugins: [
	      new css({
	          filename: "[name].css",
	          chunkFilename: "[id].css"
	      }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}

