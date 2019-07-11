const express = require("express");

const user = require("../routes/user");
const medicine = require("../routes/medicine");
const operations = require("../routes/operations");
const department = require("../routes/department");

const { auth, adminAuth } = require("../middleware/auth");

module.exports = async (app) => {
	app.use(express.json());
	app.use("/auth", user);
	app.use("/medicine", auth, medicine);
	app.use("/operations", auth, operations);
	app.use("/department", adminAuth, department);

	// Error Handler
	app.use(async (err, req, res, next) => {
		console.log(err);
		res.status(res.locals.statusCode).json({
			success: false,
			message: res.locals.message
		});
	});
};
