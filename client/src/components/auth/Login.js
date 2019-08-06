import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../actions/auth";

const Login = ({ login, auth: { loading, isAuthenticated } }) => {
	const [formData, setFormData] = useState({ username: "", password: "" });

	const { username, password } = formData;
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		login(formData);
	};

	return (
		<Fragment>
			{!loading && isAuthenticated ? (
				<Fragment>
					<Redirect to="/dashboard" />
				</Fragment>
			) : (
				<form onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<label htmlFor="usernameField">Username</label>
						<input
							name="username"
							type="text"
							className="form-control"
							id="usernameField"
							placeholder="Enter Username"
							value={username}
							onChange={(e) => onChange(e)}
						/>
						<small className="form-text text-muted">
							We'll never share your username with anyone else.
						</small>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Password</label>
						<input
							name="password"
							type="password"
							className="form-control"
							id="exampleInputPassword1"
							placeholder="Password"
							value={password}
							onChange={(e) => onChange(e)}
						/>
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	{ login }
)(Login);
