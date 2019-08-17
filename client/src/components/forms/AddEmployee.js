import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import { loadDepartments } from "../../actions/department";

const AddEmployee = ({
	loadDepartments,
	auth,
	department: { loading, departments },
	subDepartment: { subDepartments }
}) => {
	const [formData, setFormData] = useState({
		subDepartments: [],
		departments: [],
		name: "",
		gender: ""
	});
	const { departmentArray, subDepartmentArray, name, gender } = formData;

	useEffect(() => {
		const { loading, isAdmin, user } = auth;
		if (!loading && user !== null) loadDepartments(isAdmin, user.permissions);
	}, [loadDepartments, auth]);

	// // After selecting department
	// useEffect(() => {
	// 	let department = departments.filter((department) => department._id === departmentId);
	// 	if (department.length > 0) {
	// 		loadDepartment(department[0]);
	// 		loadSubDepartments(department[0].subDepartments);
	// 	}
	// }, [departmentId, loadSubDepartments, departments, loadDepartment]);

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<form>
				<div className="form-group row">
					<label htmlFor="departmentField" className="col-2 col-form-label">
						Department
					</label>
					<select
						className="custom-select col"
						id="departmentField"
						name="departmentId"
						required
						multiple={true}
						value={departmentArray}
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
					<select
						className="custom-select col"
						id="subDepartmentField"
						name="subDepartmentId"
						required
						multiple={true}
						value={subDepartmentArray}
						onChange={(e) => onChange(e)}
					>
						<option value>Choose a subdepartment</option>
						{subDepartments.map(({ label, _id }, index) => (
							<option value={_id} key={index}>
								{label}
							</option>
						))}
					</select>
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
		subDepartment: state.subdepartment,
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ loadDepartments }
)(AddEmployee);
