const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
	permissions: [
		{
			type: String,
			enum: config.get("permissions")
		}
	]
});

const User = mongoose.model("User", userSchema);

// JOI Schema
function validateRegister(user) {
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

	return Joi.validate(user, schema, { abortEarly: false });
}

module.exports = { User, validateRegister };
