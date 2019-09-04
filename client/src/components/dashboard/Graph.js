import React from "react";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
const data = [{ name: "Page A", uv: 400, pv: 125, amt: 100 }];

const renderLineChart = () => {
	return (
		<LineChart width={600} height={300} data={data}>
			<Line type="monotone" dataKey="uv" stroke="#8884d8" />
			<CartesianGrid stroke="#ccc" />
			<XAxis dataKey="name" />
			<YAxis />
		</LineChart>
	);
};

export default renderLineChart;
