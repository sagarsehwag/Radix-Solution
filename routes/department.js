const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

const Department = require("../models/DepartmentModel");
const SubDepartment = require("../models/SubDeparmentModel");

const { adminAuth } = require("../middleware/auth");

// Fetch all departments
router.get("/", async (req, res, next) => {
	try {
		const departments = await Department.find({}, { __v: false, subDepartments: false });
		return res.json({
			success: true,
			message: "Successfully fetched all the departments",
			departments
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at GET '/department'";
		next(error);
	}
});

// Fetch multiple departments
router.post("/many", async (req, res, next) => {
	try {
		const { departmentNames } = req.body;
		const departments = await Department.find(
			{ name: { $in: departmentNames } },
			{ __v: false, subDepartments: false }
		);
		return res.json({
			success: true,
			message: "Successfully fetched multiple departments",
			departments
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/department/many'";
		next(error);
	}
});

// Fetch a department
router.get("/:departmentId", async (req, res, next) => {
	try {
		const { departmentId } = req.params;
		const department = await Department.findById(departmentId).select(
			"-__v -subDepartments"
		);
		return res.json({
			success: true,
			message: "Successfully fetched the department",
			department
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at GET '/department/:departmentId'";
		next(error);
	}
});

// Add Department
router.post("/", adminAuth, async (req, res, next) => {
	try {
		const { name } = req.body;
		const department = await Department.findOne({ name });

		if (!department) {
			newName = name
				.split(" ")
				.join("-")
				.toLowerCase();

			const newDepartment = new Department({
				name: newName,
				label: name,
				subDepartments: []
			});
			await newDepartment.save();

			return res.json({
				success: true,
				message: "Department created, Now add subdeparments"
			});
		} else {
			return res.status(401).json({
				success: false,
				message: "Department already exist"
			});
		}
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/department'";
		next(error);
	}
});

// Edit Department
router.put("/", adminAuth, async (req, res, next) => {
	try {
		const { name, id } = req.body;
		const department = await Department.findById(id);

		if (department) {
			newName = name
				.split(" ")
				.join("-")
				.toLowerCase();

			await Department.findByIdAndUpdate(id, { name: newName, label: name });

			return res.json({
				success: true,
				message: "Department updated"
			});
		} else {
			return res.status(401).json({
				success: false,
				message: "Department does not exist"
			});
		}
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at PUT '/department/edit'";
		next(error);
	}
});

// Delete Department
router.delete("/", adminAuth, async (req, res, next) => {
	try {
		const { id } = req.body;
		const department = await Department.findById(id);

		if (department) {
			const subDepartments = department.subDepartments;

			// Deleting All The Subdepartments
			await SubDepartment.deleteMany({ _id: { $in: subDepartments } });

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
		res.locals.message = "Server Error at DELETE '/department'";
		next(error);
	}
});

// Fetch a subdepartment
router.get("/subdepartment/:subDepartmentId", async (req, res, next) => {
	try {
		const { subDepartmentId } = req.params;
		const subDepartment = await SubDepartment.findById(subDepartmentId);
		return res.json({
			success: true,
			message: "Successfully fetched the subdepartment",
			subDepartment
		});
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message =
			"Server Error at GET '/department/subdepartment/:subDepartmentId'";
		next(error);
	}
});

// Fetch multiple subdepartments
router.post("/subdepartment/many", async (req, res, next) => {
	try {
		const { departmentId, departmentIds } = req.body;
		let subDepartments = [];
		if (departmentIds) {
			subDepartments = await SubDepartment.find(
				{ department: { $in: departmentIds } },
				{ __v: false, employees: false }
			);
		} else {
			subDepartments = await SubDepartment.find(
				{ department: departmentId },
				{ __v: false, employees: false }
			);
		}

		return res.json({
			success: true,
			message: "Successfully fetched multiple subdepartments",
			subDepartments
		});
	} catch (error) {
		console.log(error);
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at POST '/department/subdepartment/many'";
		next(error);
	}
});

// Add Subdepartment
router.post("/subdepartment", async (req, res, next) => {
	try {
		let { subDepartmentName, departmentId } = req.body;
		const label = subDepartmentName;
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
					employees: [],
					label
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
		res.locals.message = "Server Error at POST '/department/subdepartment'";
		next(error);
	}
});

// Edit Subdepartment
router.put("/subdepartment", async (req, res, next) => {
	try {
		let { id, name, departmentId } = req.body;

		const label = name;
		name = name
			.split(" ")
			.join("-")
			.toLowerCase();

		const department = await Department.findById(departmentId);
		const subDepartment = await SubDepartment.findById(id);

		if (department) {
			if (subDepartment) {
				if (departmentId !== subDepartment.department) {
					// Remove subdepartment id from old department's subdepartments array
					await Department.findByIdAndUpdate(subDepartment.department, {
						$pull: { subDepartments: id }
					});
				}

				await SubDepartment.findByIdAndUpdate(id, {
					name,
					label,
					department: departmentId
				});

				return res.json({
					success: true,
					message: "Subdepartment updated"
				});
			} else {
				return res.status(401).json({
					success: false,
					message: "SubDepartment does not exist"
				});
			}
		} else {
			return res.status(401).json({
				success: false,
				message: "Department does not exist"
			});
		}
	} catch (error) {
		console.log(error);
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at PUT '/department/subdepartment'";
		next(error);
	}
});

// Delete Subdepartment
router.delete("/subdepartment", async (req, res, next) => {
	try {
		let { id } = req.body;
		const deletedSubDepartment = await SubDepartment.findByIdAndDelete(id);

		if (!deletedSubDepartment) {
			return res.status(401).json({
				success: false,
				message: "ObjectId is not valid or subdeparment does not exist"
			});
		}

		const { department } = deletedSubDepartment;
		await Department.findByIdAndUpdate(department, {
			$pull: { subDepartments: id }
		});

		return res.json({ success: true, message: "Successfully Deleted" });
	} catch (error) {
		res.locals.statusCode = 500;
		res.locals.message = "Server Error at DELETE '/department/subdepartment'";
		next(error);
	}
});

module.exports = router;
