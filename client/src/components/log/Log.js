import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import { loadDepartment, loadDepartments } from "../../actions/department";
import { loadSubDepartment, loadSubDepartments } from "../../actions/subdepartment";
import { loadEmployee, loadEmployees } from "../../actions/employee";

const Log = ({
	loadDepartment,
	loadDepartments,
	loadSubDepartment,
	loadSubDepartments,
	loadEmployee,
	loadEmployees,
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
		let department = departments.filter((department) => department._id === departmentId);
		if (department.length > 0) {
			loadDepartment(department[0]);
			loadSubDepartments(department[0].subDepartments);
		}
	}, [departmentId, loadSubDepartments, departments, loadDepartment]);

	// After selecting subdepartment
	useEffect(() => {
		let subDepartment = subDepartments.filter((sub) => sub._id === subDepartmentId);
		if (subDepartment.length > 0) {
			loadSubDepartment(subDepartment[0]);
			loadEmployees(subDepartment[0].employees);
		}
	}, [subDepartmentId, subDepartments, loadSubDepartment, loadEmployees]);

	// After selecting employee
	useEffect(() => {
		let employee = employees.filter((emp) => emp._id === employeeId);
		if (employee.length > 0) loadEmployee(employee[0]);
	}, [employeeId, employees, loadEmployee]);

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
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
		loadDepartment,
		loadDepartments,
		loadSubDepartment,
		loadSubDepartments,
		loadEmployee,
		loadEmployees
	}
)(Log);
