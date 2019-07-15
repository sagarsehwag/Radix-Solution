const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	label: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	subDepartments: [
		{
			type: Schema.Types.ObjectId,
			ref: "SubDepartment"
		}
	]
});

module.exports = mongoose.model("Department", departmentSchema);
