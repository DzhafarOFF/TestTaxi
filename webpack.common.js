const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const clientConfig = {
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/',
		filename: 'static/main.js',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.json',
						},
					}, 'eslint-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
		    template: "./src/index.html",
		    filename: "./index.html"
		}),
		new MiniCssExtractPlugin({ filename: 'static/main.css' }),
	],
};

module.exports = clientConfig;
