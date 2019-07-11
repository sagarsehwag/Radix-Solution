const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

const SubDepartment = require("../models/SubDeparmentModel");
const Department = require("../models/DepartmentModel");
const Employee = require("../models/EmployeeModel");

router.get("/:EmployeeId", async (req, res, next) => {
	try {
		const id = req.params.EmployeeId;
		const employeeData = await Employee.findById(id);

		res.json({
			success: true,
			message: "Successfull Access at '/employee'",
			employeeData
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at '/employee'";
		next(error);
	}
});

router.post("/add", async (req, res, next) => {
	try {
		const { name, gender, deparments, subDepartments } = req.body;

		const deparmentArray = Department.find({});

		const newEmployee = new Employee({ name, gender, deparments, subDepartments });

		await newEmployee.save();

		res.json({
			success: true,
			message: "Successfull Access at '/employee/add'"
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at '/employee/add'";
		next(error);
	}
});

module.exports = router;
