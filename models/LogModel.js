const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
	department: {
		type: Schema.Types.ObjectId,
		ref: "Department"
	},
	subDepartment: {
		type: Schema.Types.ObjectId,
		ref: "SubDepartment"
	},
	employee: {
		type: Schema.Types.ObjectId,
		ref: "Employee"
	},
	numberOfCases: {
		type: Number,
		required: true
	},
	tentativeRevenue: {
		type: Number,
		default: 0
	},
	conversionRatio: {
		type: Number,
		default: 0
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("Form", logSchema);
