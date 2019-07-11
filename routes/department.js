const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

const Department = require("../models/DepartmentModel");
const SubDepartment = require("../models/SubDeparmentModel");

router.post("/add", async (req, res, next) => {
	try {
		const { name } = req.body;
		const department = await Department.findOne({ name });

		if (!department) {
			newName = name
				.split(" ")
				.join("-")
				.toLowerCase();

			const newDepartment = new Department({ name: newName, subDepartment: [] });
			await newDepartment.save();

			return res.json({
				success: true,
				message: "Department Created, Now add subdeparments"
			});
		} else {
			return res.json({
				success: false,
				message: "Department already exist"
			});
		}
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at '/department/add'";
		next(error);
	}
});

router.delete("/delete", async (req, res, next) => {
	try {
		let { name } = req.body;
		name = name
			.split(" ")
			.join("-")
			.toLowerCase();

		const department = await Department.findOne({ name });

		if (department) {
			const subDepartment = department.subDepartment;

			// Deleting All The Subdepartments
			subDepartment.map(async (id) => {
				await SubDepartment.findByIdAndDelete(id);
			});

			// Deleting Department
			await Department.findByIdAndDelete(department._id);

			return res.json({
				success: true,
				message: "Department deleted"
			});
		} else {
			return res.json({
				success: false,
				message: "Department does not exist"
			});
		}
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at '/department/add'";
		next(error);
	}
});

router.post("/subdepartment/add", async (req, res, next) => {
	try {
		let { subDepartmentName, departmentName } = req.body;
		subDepartmentName = subDepartmentName
			.split(" ")
			.join("-")
			.toLowerCase();
		departmentName = departmentName
			.split(" ")
			.join("-")
			.toLowerCase();

		const subDepartment = await SubDepartment.findOne({
			name: subDepartmentName
		});

		const department = await Department.findOne({ name: departmentName });

		if (department) {
			if (!subDepartment || subDepartment.department === departmentName.id) {
				const newSubDepartment = new SubDepartment({
					name: subDepartmentName,
					department: department.id,
					employee: []
				});
				await newSubDepartment.save();

				await Department.findOneAndUpdate(
					{ _id: department.id },
					{ $push: { subDepartment: newSubDepartment.id } }
				);

				return res.json({
					success: true,
					message: "SubDepartment added"
				});
			} else {
				return res.json({
					success: false,
					message: "SubDepartment already exist"
				});
			}
		} else {
			return res.json({
				success: false,
				message: "Department does not exist"
			});
		}
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at '/department/subdepartment/add'";
		next(error);
	}
});

router.delete("/subdepartment/delete", (req, res, next) => {
	res.json({
		success: true,
		message: "Successfull Access at /subdepartment/delete"
	});
});

module.exports = router;
