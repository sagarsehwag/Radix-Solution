const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50
	},
	username: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024
	},
	permission: {
		admin: {
			type: Boolean,
			default: false
		},
		medicine: {
			type: Boolean,
			default: false
		},
		operations: {
			type: Boolean,
			default: false
		}
	}
});

const User = mongoose.model("User", userSchema);

// JOI Schema
function validateUser(user) {
	const schema = {
		name: Joi.string()
			.min(2)
			.max(50)
			.required(),
		username: Joi.string()
			.min(5)
			.max(255)
			.required(),
		password: Joi.string()
			.min(5)
			.max(32)
			.required()
	};

	return Joi.validate(user, schema);
}

module.exports = { User, validateUser };
