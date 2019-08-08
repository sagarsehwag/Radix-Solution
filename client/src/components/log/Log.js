import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

import { loadUser } from "../../actions/auth";
import { loadDepartment, loadDepartments } from "../../actions/department";
import { loadSubDepartment, loadSubDepartments } from "../../actions/subdepartment";

const Log = ({
	loadUser,
	loadDepartment,
	loadDepartments,
	loadSubDepartment,
	loadSubDepartments,
	department: { department, departments, loading },
	subdepartment: { subdepartment, subdepartments },
	employee: { employee, employees },
	auth
}) => {
	// const [formData, setFormData] = useState({ subDepartmentId: "" });

	useEffect(() => {
		const { loading, isAdmin, permissions } = auth;
		if (!loading) loadDepartments(isAdmin, permissions);
	}, [loadDepartments, auth]);

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<Fragment>
				<form action="">
					<div className="form-group">
						<select className="custom-select" required>
							<option value>Choose department</option>
							{departments.map(({ label, _id }, index) => (
								<option value={_id} key={index}>
									{label}
								</option>
							))}
						</select>
						<div className="form-text ml-1 small text-muted">
							Select department select feedback
						</div>
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
	{ loadUser, loadDepartment, loadDepartments, loadSubDepartment, loadSubDepartments }
)(Log);
