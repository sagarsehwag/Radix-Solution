import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";

import Spinner from "../layout/Spinner";

import { loadDepartments } from "../../actions/department";
import { loadSubDepartments } from "../../actions/subdepartment";
import { loadEmployees, deleteEmployee } from "../../actions/employee";

const EditEmployee = ({
	loadDepartments,
	loadSubDepartments,
	loadEmployees,
	deleteEmployee,
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
		if (departmentArray.length > 0) loadSubDepartments(null, [...departmentArray]);
	}, [departmentArray, loadSubDepartments]);

	useEffect(() => {
		if (subDepartmentArray.length > 0) loadEmployees();
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
				<form className="mt-4 row">
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
				</form>

				<table className="table table-bordered mt-4">
					<thead className="thead">
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Gender</th>
							<th scope="col">Edit</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						{employees.map(({ _id, name, gender }, index) => {
							return (
								<tr key={_id}>
									<td>{name}</td>
									<td>{gender}</td>
									<td>
										<Link to={`/employee/${_id}`} className="btn btn-primary">
											Edit
										</Link>
									</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={(e) => {
												deleteEmployee(_id);
											}}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
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
	{ loadDepartments, loadSubDepartments, loadEmployees, deleteEmployee }
)(EditEmployee);
