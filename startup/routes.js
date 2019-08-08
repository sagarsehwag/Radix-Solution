const express = require("express");

const user = require("../routes/user");
const logs = require("../routes/logs");
const employee = require("../routes/employee");
const department = require("../routes/department");

const test = require("../routes/test");

const { auth, adminAuth } = require("../middleware/auth");
const logger = require("../middleware/logger");

module.exports = async (app) => {
	app.use(express.json());
	app.use("/auth", user);
	app.use("/logs", auth, logs);
	app.use("/employee", auth, employee);
	app.use("/department", auth, department);
	app.use("/test", test);

	// Global Error Handler
	app.use(async (err, req, res, next) => {
		logger.error(err.message, err);
		res.status(res.locals.statusCode).json({
			success: false,
			message: res.locals.message
		});
	});
};
