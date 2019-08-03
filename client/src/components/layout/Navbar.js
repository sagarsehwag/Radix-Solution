import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = (props) => {
	return (
		<nav>
			<div className="nav-wrapper #0d47a1 blue darken-4">
				<Link to="/" className="brand-logo">
					Radix Solutions
				</Link>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<Link>Add Employee</Link>
					</li>
					<li>
						<Link>Add Data</Link>
					</li>
					<li>
						<Link>JavaScript</Link>
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
