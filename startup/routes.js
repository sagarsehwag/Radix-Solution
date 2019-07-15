const express = require("express");
const winston = require("winston");

const user = require("../routes/user");
const medicine = require("../routes/medicine");
const operations = require("../routes/operations");
const employee = require("../routes/employee");
const department = require("../routes/department");

const test = require("../routes/test");

const { auth, adminAuth } = require("../middleware/auth");
const logger = require("../middleware/logger");

module.exports = async (app) => {
	app.use(express.json());
	app.use("/auth", user);
	app.use("/medicine", auth, medicine);
	app.use("/operations", auth, operations);
	app.use("/employee", auth, employee);
	app.use("/department", adminAuth, department);
	app.use("/test", test);

	// Global Error Handler
	app.use(async (err, req, res, next) => {
		winston.error(err.message, err);
		res.status(res.locals.statusCode).json({
			success: false,
			message: res.locals.message
		});
	});
};
