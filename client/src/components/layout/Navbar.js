import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = (props) => {
	return (
		<nav className="navbar navbar-light bg-light">
			<a className="navbar-brand">Radix Solution</a>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav" id="navbarText">
					<li className="nav-item">
						<a className="nav-link" href="#">
							Add Employee <span className="sr-only">(current)</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">
							Add Logs
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">
							Pricing
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

const mapStateToProps = (state) => {
	return {};
};

export default connect(
	mapStateToProps,
	{}
)(Navbar);
