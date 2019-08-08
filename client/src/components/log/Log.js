import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import { loadUser } from "../../actions/auth";
import { loadDepartment, loadDepartments } from "../../actions/department";
import { loadSubDepartment, loadSubDepartments } from "../../actions/subdepartment";

const Log = ({
	loadUser,
	loadDepartment,
	loadDepartments,
	loadSubDepartment,
	loadSubDepartments,
	department: { department, departments, loading },
	subdepartment: { subDepartment, subDepartments },
	employee: { employee, employees },
	auth
}) => {
	const [formData, setFormData] = useState({
		departmentId: "",
		subDepartmentId: "",
		employeeId: ""
	});
	const { departmentId, subDepartmentId, employeeId } = formData;

	useEffect(() => {
		const { loading, isAdmin, user } = auth;
		if (!loading && user !== null) loadDepartments(isAdmin, user.permissions);
	}, [loadDepartments, auth]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		console.log(formData);
	};

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<form action="">
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
							<option value>Choose department</option>
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
						<select className="custom-select col" id="subDepartmentField" required>
							<option value>Choose subdepartment</option>
							{subDepartments.map(({ label, _id }, index) => (
								<option value={_id} key={index}>
									{label}
								</option>
							))}
						</select>
					</div>

					<div className="form-group row">
						<label htmlFor="employeeField" className="col-2 col-form-label">
							Employee
						</label>
						<select className="custom-select col" id="employeeField" required>
							<option value>Choose employee</option>
							{employees.map(({ name, _id }, index) => (
								<option value={_id} key={index}>
									{name}
								</option>
							))}
						</select>
					</div>

					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</Fragment>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		department: state.department,
		subdepartment: state.subdepartment,
		employee: state.employee,
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{
		loadUser,
		loadDepartment,
		loadDepartments,
		loadSubDepartment,
		loadSubDepartments
	}
)(Log);
