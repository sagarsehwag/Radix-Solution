import React from "react";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
	return (
		<div>
			<div className="row">
				<h1 className="col">Dashboard</h1>
				<Link to="/log" className="col-1">
					<i className="fas fa-plus-circle fa-4x" />
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
