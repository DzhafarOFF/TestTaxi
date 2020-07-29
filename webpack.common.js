const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const clientConfig = {
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/',
		filename: '[name].js',
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
				test: /\.(s*)css$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			// {
			// 	test: /\.(png|svg|jpg|gif)$/,
			// 	loader: 'file-loader',
			// 	options: {
			// 		name: '[name].[ext]',
			// 	},
			// },
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
		    template: "./src/index.html",
		    filename: "./index.html"
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/App/components/icons', to: 'icons' }
			],
		})
		// new MiniCssExtractPlugin({ filename: 'static/main.css' }),
	],
};

module.exports = clientConfig;
