import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";

import Spinner from "../layout/Spinner";

import { loadDepartments } from "../../actions/department";
import { loadSubDepartments, deleteSubDepartment } from "../../actions/subdepartment";

const SubDepartment = ({
	loadDepartments,
	loadSubDepartments,
	deleteSubDepartment,
	department: { departments, loading },
	subdepartment: { subDepartments }
}) => {
	const [formData, setFormData] = useState({ departmentArray: [] });
	const { departmentArray } = formData;

	useEffect(() => {
		loadDepartments(true);
	}, [loadDepartments]);

	useEffect(() => {
		if (departmentArray.length > 0) loadSubDepartments(null, departmentArray);
	}, [departmentArray, loadSubDepartments]);

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<div>
					<div className="row">
						<h1 className="col">Subdepartments</h1>
						<Link to="/subdepartment/add" className="col-1">
							<i className="fas fa-plus-circle fa-4x" />
						</Link>
					</div>
				</div>

				<form className="mt-4">
					<Select
						required
						className="col"
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
				</form>

				<table className="table table-bordered rounded mt-4">
					<thead className="thead">
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
										<button
											className="btn btn-danger"
											onClick={(e) => deleteSubDepartment(_id)}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{/* 
				<div className="row">
					{subDepartments.map(({ label, _id }, index) => {
						return (
							<div key={_id} className="bg-light rounded shadow-sm p-3 m-3">
								<h4>{label}</h4>
								<Link to={`/subdepartment/${_id}`} className="btn btn-primary mx-2">
									Edit
								</Link>
								<button
									className="btn btn-danger mx-2"
									onClick={(e) => deleteSubDepartment(_id)}
								>
									Delete
								</button>
							</div>
						);
					})}
				</div> */}
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
	{ loadDepartments, loadSubDepartments, deleteSubDepartment }
)(SubDepartment);
