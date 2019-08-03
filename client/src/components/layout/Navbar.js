import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
	render() {
		return (
			<nav>
				<div className="nav-wrapper #0d47a1 blue darken-4">
					<Link href="#" className="brand-logo">
						Radix Solutions
					</Link>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li>
							<Link href="sass.html">Add Employee</Link>
						</li>
						<li>
							<Link href="badges.html">Add Data</Link>
						</li>
						<li>
							<Link href="collapsible.html">JavaScript</Link>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
