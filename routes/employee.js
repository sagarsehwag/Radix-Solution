const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

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
		let { name, gender, departments, subDepartments } = req.body;
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
			message: "Successfully Created New Employee"
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at '/employee/add'";
		next(error);
	}
});

router.delete("/delete", async (req, res, next) => {
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
		res.locals.message = "Server Error at '/employee/delete'";
		next(error);
	}
});

module.exports = router;
