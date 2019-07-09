const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50
	},
	departments: [String],
	image: {
		type: String
	},
	gender: {
		type: String,
		minlength: 4,
		maxlength: 6,
		required: true
	}
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
