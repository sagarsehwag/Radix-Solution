const mongoose = require("mongoose");
const express = require("express");
const winston = require("winston");

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const SubDepartment = require("../models/SubDeparmentModel");
const Department = require("../models/DepartmentModel");
const Employee = require("../models/EmployeeModel");
const User = require("../models/UserModel");

router.get("/", async (req, res, next) => {
	try {
		// throw new Error("Fucking Error");

		res.json({
			success: true,
			message: "Successfull Access at /test"
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at GET '/test'";
		next(error);
	}
});

module.exports = router;
