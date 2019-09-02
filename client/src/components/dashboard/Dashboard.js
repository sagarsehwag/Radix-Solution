import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import { loadDepartments } from "../../actions/department";
import { loadSubDepartments } from "../../actions/subdepartment";
import { getLogs, deleteLog } from "../../actions/logs";

const Dashboard = ({
	loadDepartments,
	loadSubDepartments,
	getLogs,
	deleteLog,
	isAdmin,
	department: { departments, loading },
	subdepartment: { subDepartments },
	logs
}) => {
	const [formData, setFormData] = useState({
		subDepartmentArray: new Set(),
		departmentArray: new Set(),
		page: 1
	});
	const { departmentArray, subDepartmentArray, page } = formData;

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
		getLogs([...departmentArray], [...subDepartmentArray], page);
	}, [getLogs, departmentArray, subDepartmentArray, page]);

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<div>
				<div className="row">
					<h1 className="col">Dashboard</h1>
					<Link to="/log" className="col-1">
						<i className="fas fa-plus-circle fa-4x" />
					</Link>
				</div>
				<div className="row mt-2">
					<Link to="employee" className="btn btn-primary mr-2 ml-3">
						Employees
					</Link>
					<Link to="subdepartment" className="btn btn-primary mx-2">
						Subdepartments
					</Link>

					{isAdmin ? (
						<Fragment>
							<Link to="department" className="btn btn-primary mx-2">
								Departments
							</Link>
						</Fragment>
					) : (
						""
					)}
				</div>

				<form className="mt-4 ui">
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

				<table className="table mt-4">
					<thead className="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Department</th>
							<th scope="col">Subdepartment</th>
							<th scope="col">Employee</th>
							<th scope="col">Test Cases</th>
							<th scope="col">Tentative Revenue</th>
							<th scope="col">Conversion Ratio</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						{logs.map(
							(
								{
									_id,
									department: { label },
									subDepartment: { label: subdepartment },
									employee: { name },
									numberOfCases,
									tentativeRevenue,
									conversionRatio
								},
								index
							) => {
								return (
									<tr key={_id}>
										<th scope="row">{index + 1}</th>
										<td>{label}</td>
										<td>{subdepartment}</td>
										<td>{name}</td>
										<td>{numberOfCases}</td>
										<td>{tentativeRevenue}</td>
										<td>{conversionRatio}</td>

										<td>
											<button className="btn btn-danger" onClick={(e) => deleteLog(_id)}>
												Delete
											</button>
										</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		isAdmin: state.auth.isAdmin,
		department: state.department,
		subdepartment: state.subdepartment,
		logs: state.logs
	};
};

export default connect(
	mapStateToProps,
	{ loadDepartments, loadSubDepartments, getLogs, deleteLog }
)(Dashboard);
