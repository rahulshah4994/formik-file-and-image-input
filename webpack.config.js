const path = require("path");

module.exports = {
	entry: path.resolve(__dirname, "./src/index.js"),
	output: {
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: "babel-loader",
			},
		],
	},
};
