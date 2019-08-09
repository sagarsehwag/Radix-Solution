import React, { useState } from "react";

const AddDepartment = () => {
	const [formData, setFormData] = useState({ name: "" });
	const { name } = formData;

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, name: e.target.value });
	};

	return (
		<form>
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

export default AddDepartment;
