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

			const newDepartment = new Department({ name: newName, subDepartments: [] });
			await newDepartment.save();

			return res.json({
				success: true,
				message: "Department Created, Now add subdeparments"
			});
		} else {
			return res.status(401).json({
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
		const { id } = req.body;
		const department = await Department.findById(id);

		if (department) {
			const subDepartments = department.subDepartments;

			// Deleting All The Subdepartments
			subDepartments.map(async (id) => {
				await SubDepartment.findByIdAndDelete(id);
			});

			// Deleting Department
			await Department.findByIdAndDelete(id);

			return res.json({
				success: true,
				message: "Department deleted"
			});
		} else {
			return res.status(401).json({
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
		let { subDepartmentName, departmentId } = req.body;
		subDepartmentName = subDepartmentName
			.split(" ")
			.join("-")
			.toLowerCase();

		const department = await Department.findById(departmentId);
		const subDepartment = await SubDepartment.findOne({
			name: subDepartmentName,
			department: departmentId
		});

		if (department) {
			if (!subDepartment) {
				const newSubDepartment = new SubDepartment({
					name: subDepartmentName,
					department: departmentId,
					employees: []
				});
				await newSubDepartment.save();

				await Department.findByIdAndUpdate(departmentId, {
					$push: { subDepartments: newSubDepartment.id }
				});

				return res.json({
					success: true,
					message: "SubDepartment added"
				});
			} else {
				return res.status(401).json({
					success: false,
					message: "SubDepartment already exist"
				});
			}
		} else {
			return res.status(401).json({
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

router.delete("/subdepartment/delete", async (req, res, next) => {
	try {
		let { id } = req.body;
		const deletedSubDepartment = await SubDepartment.findByIdAndDelete(id);

		if (!deletedSubDepartment) {
			return res.status(401).json({
				success: false,
				message: "ObjectId is not valid or SubDeparment does not exist"
			});
		}

		const { department } = deletedSubDepartment;
		await Department.findByIdAndUpdate(department, {
			$pull: { subDepartments: id }
		});

		return res.json({ success: true, message: "Successfully Deleted" });
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at '/department/subdepartment/add'";
		next(error);
	}
});

module.exports = router;
