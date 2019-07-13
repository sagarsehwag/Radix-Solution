const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

const SubDepartment = require("../models/SubDeparmentModel");
const Department = require("../models/DepartmentModel");
const Employee = require("../models/EmployeeModel");
const User = require("../models/UserModel");

router.get("/", async (req, res, next) => {
	res.json({
		success: true,
		message: "Successfull Access at /test"
	});
});

module.exports = router;
