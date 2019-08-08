import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout, history }) => {
	const authLinks = (
		<Fragment>
			<Link to="/dashboard" className="nav-item nav-link">
				<i className="fas fa-user mr-1" />
				Dashboard
			</Link>
			<Link to="#" className="nav-item nav-link" onClick={() => logout(history)}>
				<i className="fas fa-sign-out-alt mr-1" />
				Logout
			</Link>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Link to="/register" className="nav-item nav-link">
				Register
			</Link>
		</Fragment>
	);

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-white shadow mb-5">
			<Link to="/" className="navbar-brand">
				<img
					src="https://radixhealthcare.org/logo_radix-02-04.png"
					width="30"
					height="30"
					className="d-inline-block align-top mr-2"
					alt=""
				/>
				Radix Solution
			</Link>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<div className="navbar-nav ml-auto">
					{!loading && isAuthenticated ? authLinks : guestLinks}
				</div>
			</div>
		</nav>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ logout }
)(withRouter(Navbar));
