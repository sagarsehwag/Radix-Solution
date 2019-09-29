const express = require("express");
const path = require("path");

module.exports = async (app) => {
	try {
		// process.env.NODE_ENV = "production";
		// Serve static assets in production
		if (process.env.NODE_ENV === "production") {
			app.use(express.static("client/build"));
			app.get("*", (req, res) => {
				res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
			});
		}
	} catch (error) {
		console.log(error);
	}
};
