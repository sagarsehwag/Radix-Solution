import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Spinner from "../layout/Spinner";

import { loadDepartments, deleteDepartment } from "../../actions/department";

const Department = ({
	loadDepartments,
	deleteDepartment,
	department: { departments, loading }
}) => {
	useEffect(() => {
		loadDepartments(true);
	}, [loadDepartments]);

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<div>
					<div className="row">
						<h1 className="col">Departments</h1>
						<Link to="/department/add" className="col-1">
							<i className="fas fa-plus-circle fa-4x" />
						</Link>
					</div>
				</div>

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
						{departments.map(({ label, _id }, index) => {
							return (
								<tr key={_id}>
									<th scope="row">{index + 1}</th>
									<td>{label}</td>
									<td>
										<Link to={`/department/${_id}`} className="btn btn-primary">
											Edit
										</Link>
									</td>
									<td>
										<button
											className="btn btn-danger"
											onClick={(e) => {
												deleteDepartment(_id);
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
		department: state.department
	};
};

export default connect(
	mapStateToProps,
	{ loadDepartments, deleteDepartment }
)(Department);
