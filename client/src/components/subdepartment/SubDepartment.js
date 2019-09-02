import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

import { loadDepartments } from "../../actions/department";
import { loadSubDepartments } from "../../actions/subdepartment";

const SubDepartment = ({
	loadDepartments,
	loadSubDepartments,
	department: { departments, loading },
	subdepartment: { subDepartments }
}) => {
	const [formData, setFormData] = useState({ departmentArray: new Set() });
	const { departmentArray } = formData;

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

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<div>
					<div className="row">
						<h1 className="col">Subdepartments</h1>
						<Link to="/department/add" className="col-1">
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
				</form>

				<table className="table mt-4">
					<thead className="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Edit</th>
							<th scope="col">Delete</th>
						</tr>
					</thead>
					<tbody>
						{subDepartments.map(({ label, _id }, index) => {
							return (
								<tr key={_id}>
									<th scope="row">{index + 1}</th>
									<td>{label}</td>
									<td>
										<Link to={`/subdepartment/${_id}`} className="btn btn-primary">
											Edit
										</Link>
									</td>
									<td>
										<button className="btn btn-danger">Delete</button>
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
		subdepartment: state.subdepartment
	};
};

export default connect(
	mapStateToProps,
	{ loadDepartments, loadSubDepartments }
)(SubDepartment);
