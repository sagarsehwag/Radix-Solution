import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import { loadDepartments } from "../../actions/department";
import { loadSubDepartments } from "../../actions/subdepartment";
import { loadEmployees } from "../../actions/employee";
import { addLog } from "../../actions/logs";

const Log = ({
	loadDepartments,
	loadSubDepartments,
	loadEmployees,
	addLog,
	department: { departments, loading },
	subdepartment: { subDepartments },
	employee: { employees },
	auth
}) => {
	const [formData, setFormData] = useState({
		departmentId: "",
		subDepartmentId: "",
		employeeId: "",
		testCases: "",
		tentativeRevenue: "",
		conversionRatio: ""
	});
	const {
		departmentId,
		subDepartmentId,
		employeeId,
		testCases,
		tentativeRevenue,
		conversionRatio
	} = formData;

	useEffect(() => {
		const { loading, isAdmin, user } = auth;
		if (!loading && user !== null) loadDepartments(isAdmin, user.permissions);
	}, [loadDepartments, auth]);

	// After selecting department
	useEffect(() => {
		if (departmentId !== "") loadSubDepartments(departmentId);
	}, [departmentId, loadSubDepartments]);

	// After selecting subdepartment
	useEffect(() => {
		if (subDepartmentId !== "") loadEmployees(subDepartmentId);
	}, [subDepartmentId, loadEmployees]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addLog(formData);
	};

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
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
						<select
							className="custom-select col"
							id="subDepartmentField"
							name="subDepartmentId"
							required
							value={subDepartmentId}
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

					<div className="form-group row">
						<label htmlFor="employeeField" className="col-2 col-form-label">
							Employee
						</label>
						<select
							className="custom-select col"
							id="employeeField"
							name="employeeId"
							required
							value={employeeId}
							onChange={(e) => onChange(e)}
						>
							<option value> Choose an employee</option>
							{employees.map(({ name, _id }, index) => (
								<option value={_id} key={index}>
									{name}
								</option>
							))}
						</select>
					</div>

					<div className="form-group row">
						<label htmlFor="numberOfTestCases" className="col-2 col-form-label">
							Test Cases
						</label>
						<input
							type="number"
							placeholder="Enter number of test cases"
							className="form-control col"
							id="numberOfTestCases"
							name="testCases"
							value={testCases}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div className="form-group row">
						<label htmlFor="tentativeRevenue" className="col-2 col-form-label">
							Tentative Revenue
						</label>
						<input
							type="number"
							placeholder="Enter tentative revenue"
							className="form-control col"
							id="tentativeRevenue"
							name="tentativeRevenue"
							value={tentativeRevenue}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div className="form-group row">
						<label htmlFor="conversionRatio" className="col-2 col-form-label">
							Conversion Ratio
						</label>
						<input
							type="number"
							placeholder="Enter conversion ratio"
							className="form-control col"
							id="conversionRatio"
							name="conversionRatio"
							value={conversionRatio}
							onChange={(e) => onChange(e)}
						/>
					</div>

					<div className="row">
						<button type="submit" className="btn btn-primary col ml-3">
							Submit
						</button>
					</div>
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
	{ loadDepartments, loadSubDepartments, loadEmployees, addLog }
)(Log);
