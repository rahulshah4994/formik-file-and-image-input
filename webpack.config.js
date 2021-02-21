const path = require("path");

module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, "./src/index.js"),
	module: {
		rules: [
			{
				test: /\.js$/,
				use: "babel-loader",
			},
		],
	},
};
