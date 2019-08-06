import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {} from "../../actions/auth";

import "./Login.css";

const Login = ({ loadUser }) => {
	const [formData, setFormData] = useState({ username: "", password: "" });

	const { username, password } = formData;
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<form id="loginform" onSubmit={(e) => onSubmit(e)}>
			<div className="row">
				<div className="input-field col s12">
					<i className="material-icons prefix">account_circle</i>
					<input
						id="username"
						type="text"
						className="validate"
						value={username}
						onChange={(e) => onChange(e)}
					/>
					<label htmlFor="username">Email</label>
				</div>
			</div>
			<div className="row">
				<div className="input-field col s12">
					<i className="material-icons prefix">vpn_key</i>
					<input
						id="password"
						type="password"
						className="validate"
						value={password}
						onChange={(e) => onChange(e)}
					/>
					<label htmlFor="password">Password</label>
				</div>
			</div>
			<div className="row center-align">
				<button
					className="btn waves-effect waves-light #0d47a1 blue darken-4"
					type="submit"
					name="action"
				>
					Login
					<i className="material-icons right">send</i>
				</button>
			</div>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(
	mapStateToProps,
	{}
)(Login);
