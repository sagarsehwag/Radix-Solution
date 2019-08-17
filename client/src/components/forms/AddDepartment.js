import React, { useState } from "react";
import { connect } from "react-redux";

import { addDepartment } from "../../actions/department";

const AddDepartment = ({ addDepartment }) => {
	const [formData, setFormData] = useState({ name: "" });
	const { name } = formData;

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, name: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addDepartment(formData);
	};

	return (
		<form onSubmit={(e) => onSubmit(e)}>
			<div className="form-group row">
				<label htmlFor="departmentField" className="col-2 col-form-label">
					Department
				</label>
				<input
					type="text"
					className="form-control col"
					name="name"
					placeholder="Enter department name"
					value={name}
					onChange={(e) => onChange(e)}
				/>
			</div>
			<div className="row">
				{/* <div className="col" /> */}
				<input type="submit" value="Submit" className="btn btn-primary col ml-3" />
			</div>
		</form>
	);
};

export default connect(
	null,
	{ addDepartment }
)(AddDepartment);
