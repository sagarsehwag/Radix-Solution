import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import { loadDepartments } from "../../actions/department";
import { getSubDepartment, editSubDepartment } from "../../actions/subdepartment";

const EditSubDepartment = ({
	match,
	loadDepartments,
	getSubDepartment,
	editSubDepartment,
	department: { loading: departmentLoading, departments },
	subDepartment: { subDepartment, loading }
}) => {
	const [formData, setFormData] = useState({ name: "", departmentId: "" });
	const { name, departmentId } = formData;
	const id = match.params.id;

	useEffect(() => {
		loadDepartments(true);
		getSubDepartment(id);
	}, [loadDepartments, id, getSubDepartment]);

	useEffect(() => {
		if (subDepartment) {
			const { label: name, department: departmentId, employees } = subDepartment;
			setFormData({ name, departmentId, employees });
		}
	}, [subDepartment]);

	const onChange = (e) => {
		e.preventDefault();
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		editSubDepartment(formData, id);
	};

	if (loading || departmentLoading) {
		return <Spinner />;
	} else {
		return (
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
						{departments.map(({ label, _id }, index) => (
							<option value={_id} key={index}>
								{label}
							</option>
						))}
					</select>
				</div>

				<div className="form-group row">
					<label htmlFor="name" className="col-2 col-form-label">
						Subdepartment
					</label>
					<input
						type="text"
						className="form-control col"
						id="name"
						name="name"
						placeholder="Enter subdepartment name"
						value={name}
						onChange={(e) => onChange(e)}
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
	{ loadDepartments, getSubDepartment, editSubDepartment }
)(EditSubDepartment);
