const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {
        popup: "./src/index.tsx",
        background: "./src/background.ts",
    },
    output: {
        path: path.resolve(__dirname, "../extension/assets"),
        filename: '[name].js',
        clean: true,
        publicPath: '/assets/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "../index.html",
            template: "./index.html", // to import index.html file inside index.js
        }),
        new MiniCssExtractPlugin({
            filename: "index.css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    "postcss-loader"
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]', // Nombre del archivo en la carpeta de salida
                },
            },
        ],
    }
}