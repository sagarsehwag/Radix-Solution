const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const SubDepartment = require("../models/SubDeparmentModel");
const Department = require("../models/DepartmentModel");
const Employee = require("../models/EmployeeModel");
const Log = require("../models/LogModel");

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const { department, page } = req.query;
		const logs = await Log.find({ department }, {}, { skip: page - 1, limit: 10 });
		return res.json({
			success: true,
			message: "",
			logs
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at GET '/logs'";
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const {
			departmentId,
			subDepartmentId,
			employeeId,
			numberOfCases,
			tentativeRevenue,
			conversionRatio
		} = req.body;

		const department = Department.findById(departmentId);
		const subDepartment = SubDepartment.findById(subDepartmentId);
		const employee = Employee.findById(employeeId);

		if (department && subDepartment && employee) {
			const newLog = new Log({
				department: departmentId,
				subDepartment: subDepartmentId,
				employee: employeeId,
				numberOfCases,
				tentativeRevenue,
				conversionRatio
			});
			await newLog.save();
		} else {
			return res.json({
				success: false,
				message: "Department, SubDepartment or Employee ID is not valid"
			});
		}

		return res.json({
			success: true,
			message: "Log added"
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/logs'";
		next(error);
	}
});

module.exports = router;
