import React, { Component } from "react";
import "./Login.css";

export default class Login extends Component {
	state = { email: "", password: "" };

	onFormSubmit = async (event) => {
		event.preventDefault();
	};

	render() {
		return (
			<form id="loginform" onSubmit={this.onFormSubmit}>
				<div className="row">
					<div className="input-field col s12">
						<i class="material-icons prefix">account_circle</i>
						<input
							id="email"
							type="email"
							className="validate"
							value={this.state.email}
							onChange={(e) => this.setState({ email: e.target.value })}
						/>
						<label htmlFor="email">Email</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<i class="material-icons prefix">vpn_key</i>
						<input
							id="password"
							type="password"
							className="validate"
							value={this.state.password}
							onChange={(e) => this.setState({ password: e.target.value })}
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
	}
}
