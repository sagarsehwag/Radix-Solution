import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

import { loadDepartments } from "../../actions/department";
import { loadSubDepartments } from "../../actions/subdepartment";
import { loadEmployees } from "../../actions/employee";

const EditEmployee = ({
	loadDepartments,
	loadSubDepartments,
	loadEmployees,
	department: { loading, departments },
	subDepartment: { subDepartments },
	employee: { employees }
}) => {
	const [formData, setFormData] = useState({
		subDepartmentArray: new Set(),
		departmentArray: new Set()
	});
	const { departmentArray, subDepartmentArray } = formData;

	useEffect(() => {
		loadDepartments(true);
	}, [loadDepartments]);

	useEffect(() => {
		if (departmentArray.size > 0) loadSubDepartments(null, [...departmentArray]);
	}, [departmentArray, loadSubDepartments]);

	const onSelectChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		const removeSetElement = (set, value) => {
			set.delete(value);
			return new Set([...set]);
		};

		e.preventDefault();
		setFormData({
			...formData,
			[name]: formData[name].has(value)
				? removeSetElement(formData[name], value)
				: new Set([...formData[name], value])
		});
	};

	useEffect(() => {
		if (subDepartmentArray.size > 0) loadEmployees();
	}, [subDepartmentArray, loadEmployees]);

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<div>
					<div className="row">
						<h1 className="col">Employees</h1>
						<Link to="/employee/add" className="col-1">
							<i className="fas fa-plus-circle fa-4x" />
						</Link>
					</div>
				</div>
				<form className="mt-4">
					<div className="form-group row">
						<label htmlFor="departmentField" className="col-2 col-form-label">
							Department
						</label>
						<select
							className="custom-select col"
							id="departmentField"
							name="departmentArray"
							required
							multiple={true}
							value={[...departmentArray]}
							onChange={(e) => onSelectChange(e)}
						>
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
							name="subDepartmentArray"
							size="8"
							required
							multiple={true}
							value={[...subDepartmentArray]}
							onChange={(e) => onSelectChange(e)}
						>
							{subDepartments.map(({ label, _id }, index) => (
								<option value={_id} key={index}>
									{label}
								</option>
							))}
						</select>
					</div>
				</form>
			</Fragment>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		department: state.department,
		subDepartment: state.subdepartment,
		employee: state.employee
	};
};

export default connect(
	mapStateToProps,
	{ loadDepartments, loadSubDepartments, loadEmployees }
)(EditEmployee);
