const path = require("path");

module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
		],
	},
};
