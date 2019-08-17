import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import { loadDepartments } from "../../actions/department";
import { addSubDepartment } from "../../actions/subdepartment";

const AddSubDepartment = ({
	loadDepartments,
	addSubDepartment,
	auth,
	department: { loading, departments }
}) => {
	const [formData, setFormData] = useState({ subDepartmentName: "", departmentId: "" });
	const { subDepartmentName, departmentId } = formData;

	useEffect(() => {
		const { loading, isAdmin, user } = auth;
		if (!loading && user !== null) loadDepartments(isAdmin, user.permissions);
	}, [loadDepartments, auth]);

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addSubDepartment(formData);
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
					<select
						className="custom-select col"
						id="departmentField"
						name="departmentId"
						required
						value={departmentId}
						onChange={(e) => onChange(e)}
					>
						<option value>Choose a department</option>
						{departments.map(({ label, _id }, index) => (
							<option value={_id} key={index}>
								{label}
							</option>
						))}
					</select>
				</div>

				<div className="form-group row">
					<label htmlFor="subDepartmentField" className="col-2 col-form-label">
						Subdepartment
					</label>
					<input
						type="text"
						className="form-control col"
						name="subDepartmentName"
						placeholder="Enter subdepartment name"
						value={subDepartmentName}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="row">
					{/* <div className="col" /> */}
					<input type="submit" value="Submit" className="btn btn-primary col ml-3" />
				</div>
			</form>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		department: state.department,
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ loadDepartments, addSubDepartment }
)(AddSubDepartment);
