const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50
	},
	gender: {
		type: String,
		required: true
	},
	departments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Department"
		}
	],
	subDepartments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Department"
		}
	]
});

module.exports = mongoose.model("Employee", employeeSchema);
