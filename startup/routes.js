const express = require("express");

const medicine = require("../routes/medicine");
const operations = require("../routes/operations");

module.exports = async (app) => {
	app.use(express.json());
	app.use("/auth", user);
	app.use("/medicine", auth, medicine);
	app.use("/operations", auth, operations);

	// Error Handler
	app.use(async (err, req, res, next) => {
		console.log(err);
		res.status(res.locals.statusCode).json({
			success: false,
			message: res.locals.message
		});
	});
};
