import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import Spinner from "../layout/Spinner";

import { loadDepartments } from "../../actions/department";
import { loadSubDepartments } from "../../actions/subdepartment";
import { addEmployee } from "../../actions/employee";

const AddEmployee = ({
	loadDepartments,
	loadSubDepartments,
	addEmployee,
	auth,
	department: { loading, departments },
	subDepartment: { subDepartments }
}) => {
	const [formData, setFormData] = useState({
		subDepartmentArray: [],
		departmentArray: [],
		name: "",
		gender: ""
	});
	const { departmentArray, subDepartmentArray, name, gender } = formData;

	useEffect(() => {
		const { loading, isAdmin, user } = auth;
		if (!loading && user !== null) loadDepartments(isAdmin, user.permissions);
	}, [loadDepartments, auth]);

	useEffect(() => {
		if (departmentArray.length > 0) loadSubDepartments(null, departmentArray);
	}, [departmentArray, loadSubDepartments]);

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addEmployee({
			name,
			gender,
			departments: departmentArray,
			subDepartments: subDepartmentArray
		});
	};

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<form onSubmit={(e) => onSubmit(e)}>
				<div className="form-group row">
					<label htmlFor="employeeNameField" className="col-2 col-form-label">
						Name
					</label>
					<input
						className="custom-select col"
						id="employeeNameField"
						name="name"
						required
						placeholder="Enter name"
						multiple={true}
						value={name}
						onChange={(e) => onChange(e)}
					/>
				</div>

				<div className="form-group row">
					<label htmlFor="genderField" className="col-2 col-form-label">
						Gender
					</label>
					<select
						className="custom-select col"
						id="genderField"
						name="gender"
						required
						value={gender}
						onChange={(e) => onChange(e)}
					>
						<option value>Choose a gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>

				<div className="form-group row">
					<label htmlFor="departmentField" className="col-2 col-form-label">
						Department
					</label>
					<Select
						required
						className="col"
						placeholder={"Select departments..."}
						closeMenuOnSelect={false}
						onChange={(selectedOption) => {
							if (selectedOption)
								setFormData({
									...formData,
									departmentArray: selectedOption.map(({ value }) => value)
								});
						}}
						options={departments.map(({ label, _id }) => {
							return { label, value: _id };
						})}
						isMulti
					/>
				</div>

				<div className="form-group row">
					<label htmlFor="subDepartmentField" className="col-2 col-form-label">
						Subdepartment
					</label>
					<Select
						required
						className="col"
						placeholder={"Select subdepartments..."}
						closeMenuOnSelect={false}
						onChange={(selectedOption) => {
							if (selectedOption)
								setFormData({
									...formData,
									subDepartmentArray: selectedOption.map(({ value }) => value)
								});
						}}
						options={subDepartments.map(({ label, _id }) => {
							return { label, value: _id };
						})}
						isMulti
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
		department: state.department,
		subDepartment: state.subdepartment,
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ loadDepartments, loadSubDepartments, addEmployee }
)(AddEmployee);
