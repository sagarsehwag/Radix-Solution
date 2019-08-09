import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({ isAdmin }) => {
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
					Add Employee
				</Link>
				<Link to="subdepartment" className="btn btn-primary mx-2">
					Add Subdepartment
				</Link>

				{isAdmin ? (
					<Fragment>
						<Link to="department" className="btn btn-primary mx-2">
							Add Department
						</Link>
					</Fragment>
				) : (
					""
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isAdmin: state.auth.isAdmin
	};
};

export default connect(mapStateToProps)(Dashboard);
