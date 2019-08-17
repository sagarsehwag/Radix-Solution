const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const SubDepartment = require("../models/SubDeparmentModel");
const Department = require("../models/DepartmentModel");
const Employee = require("../models/EmployeeModel");

// Fetch all employees
router.get("/", async (req, res, next) => {
	try {
		const employees = await Employee.find({}, { __v: false });
		return res.json({
			success: true,
			message: "Successfully fetched all the employees",
			employees
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at GET '/employee'";
		next(error);
	}
});

// Fetch an employee
router.get("/:employeeId", async (req, res, next) => {
	try {
		const id = req.params.employeeId;
		const employeeData = await Employee.findById(id);

		res.json({
			success: true,
			message: "Successfully fetched the employee",
			employeeData
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at GET '/employee/:employeeId'";
		next(error);
	}
});

// Fetch multiple employees
router.post("/many", async (req, res, next) => {
	try {
		const { subDepartmentId } = req.body;
		const subDepartment = await SubDepartment.findById(subDepartmentId);
		const employees = await Employee.find(
			{ _id: { $in: subDepartment.employees } },
			{ __v: false }
		);
		return res.json({
			success: true,
			message: "Successfully fetched all the employees",
			employees
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at GET '/employee/:subDepartmentId'";
		next(error);
	}
});

// Add an employee
router.post("/", async (req, res, next) => {
	try {
		let { name, gender, departments, subDepartments } = req.body;
		console.log("departments", departments);
		console.log("subDepartments", subDepartments);
		const deparmentArray = await Department.find({ _id: { $in: departments } });

		if (deparmentArray.length === departments.length) {
			departments = departments.map((id) => {
				return ObjectId(id);
			});
		} else {
			return res.status(401).json({
				success: false,
				message: "departments array has invalid ObjectId's"
			});
		}

		const subDepartmentArray = await SubDepartment.find({
			_id: { $in: subDepartments },
			department: { $in: departments }
		});

		if (subDepartmentArray.length === subDepartments.length) {
			subDepartments = subDepartments.map((id) => {
				return ObjectId(id);
			});
		} else {
			return res.status(401).json({
				success: false,
				message: "subDepartments array has invalid ObjectId's"
			});
		}

		const newEmployee = new Employee({ name, gender, departments, subDepartments });
		await newEmployee.save();

		await SubDepartment.updateMany(
			{ _id: { $in: subDepartments } },
			{ $push: { employees: newEmployee.id } }
		);

		res.json({
			success: true,
			message: "Successfully created new employee"
		});
	} catch (error) {
		console.log(error);
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/employee'";
		next(error);
	}
});

// Delete an employee
router.delete("/", async (req, res, next) => {
	try {
		const { id } = req.body;
		const deletedEmployee = await Employee.findByIdAndDelete(id);

		if (!deletedEmployee) {
			return res.status(401).json({
				success: false,
				message: "ObjectId is not valid or Employee does not exist"
			});
		}

		const { subDepartments } = deletedEmployee;
		await SubDepartment.updateMany(
			{ _id: { $in: subDepartments } },
			{ $pull: { employees: id } }
		);

		return res.json({ success: true, message: "Successfully Deleted" });
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at DELETE '/employee'";
		next(error);
	}
});

module.exports = router;
