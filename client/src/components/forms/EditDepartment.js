import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import { getDepartment, editDepartment } from "../../actions/department";

const EditDepartment = ({
	getDepartment,
	editDepartment,
	match,
	department: { department, loading }
}) => {
	const [formData, setFormData] = useState({ name: "" });
	const { name } = formData;
	const id = match.params.id;

	useEffect(() => {
		getDepartment(id);
	}, [id, getDepartment]);

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, name: e.target.value });
	};

	useEffect(() => {
		if (department) setFormData({ name: department.label });
	}, [department]);

	const onSubmit = (e) => {
		e.preventDefault();
		editDepartment(formData, id);
	};

	if (loading) {
		return <Spinner />;
	} else {
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
						placeholder="Edit department name"
						value={name}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="row">
					<input type="submit" value="Submit" className="btn btn-primary col ml-3" />
				</div>
			</form>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		department: state.department
	};
};

export default connect(
	mapStateToProps,
	{ getDepartment, editDepartment }
)(EditDepartment);
