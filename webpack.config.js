const path = require("path");
const ReactRefreshWebpackPlugin =require("@pmmmwh/react-refresh-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

let mode = "development";
let target ="web";
const plugins = [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
        template: "./src/index.html",
    }),
];

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = "browserslist";
    plugins.push(new CleanWebpackPlugin ());
} 
if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    mode: mode,
    target: target,

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname,"dist"),
        assetModuleFilename: "images/[hash][ext][query]",
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset"
            },
            {
                test: /\.(s[ac])ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" }
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
            {   
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(htm|html)$/,
                use: [
                    "html-loader"
                ]
            }
        ]
    },

    plugins: plugins,
    
    resolve: {
        extensions: [".js",".jsx"]
    },    

    devtool: "source-map",
    devServer: {
        // port: 9000,
        contentBase: path.join(__dirname, '/dist'),
        hot: true
    }
}
