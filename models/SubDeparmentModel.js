const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subDepartmentSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	subDepartment: [
		{
			type: Schema.Types.ObjectId,
			ref: "Employee"
		}
	]
});

module.exports = mongoose.model("SubDepartment", subDepartmentSchema);
