const mongoose = require("mongoose");
const express = require("express");

const SubDepartment = require("../models/SubDeparmentModel");
const Department = require("../models/DepartmentModel");
const Employee = require("../models/EmployeeModel");
const Log = require("../models/LogModel");

const router = express.Router();

// Fetch past records or logs
router.post("/get", async (req, res, next) => {
	try {
		const { departments, subDepartments, page } = req.body;

		let params = {};
		if (departments.length === 0 && subDepartments.length === 0);
		else if (subDepartments.length !== 0) params.subDepartment = { $in: subDepartments };
		else if (departments.length !== 0) params.department = { $in: departments };

		const logs = await Log.find(
			{ ...params },
			{ __v: false },
			{ skip: (page - 1) * 10, limit: 10 }
		).populate("department subDepartment employee");

		return res.json({
			success: true,
			message: "all the logs",
			logs
		});
	} catch (error) {
		console.log(error);
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at GET '/logs'";
		next(error);
	}
});

// Add a log
router.post("/", async (req, res, next) => {
	try {
		const {
			departmentId,
			subDepartmentId,
			employeeId,
			testCases: numberOfCases,
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
			message: "log added"
		});
	} catch (error) {
		console.log(error);
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/logs'";
		next(error);
	}
});

router.delete("/", async (req, res, next) => {
	try {
		const { id } = req.body;
		await Log.findByIdAndDelete(id);

		return res.json({
			success: true,
			message: "log deleted"
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at DELETE '/logs'";
		next(error);
	}
});

module.exports = router;
