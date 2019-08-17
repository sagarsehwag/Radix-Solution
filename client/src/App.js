import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import PrivateRoute from "./components/routing/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Log from "./components/log/Log";
import AddDepartment from "./components/forms/AddDepartment";
import AddSubDepartment from "./components/forms/AddSubDepartment";
import AddEmployee from "./components/forms/AddEmployee";

import { loadUser } from "./actions/auth";

import store from "./store/store";

import setAuthToken from "./utils/setAuthToken";
setAuthToken();

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<section className="container shadow rounded bg-white p-5">
						<Alert />
						<Switch>
							<Route exact path="/" component={Login} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute exact path="/log" component={Log} />
							<PrivateRoute exact path="/department" component={AddDepartment} />
							<PrivateRoute exact path="/subdepartment" component={AddSubDepartment} />
							{/* <PrivateRoute exact path="/employee" component={AddEmployeecl} />} */}
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
