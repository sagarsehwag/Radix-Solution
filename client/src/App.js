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

import Department from "./components/department/Department";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";

import SubDepartment from "./components/subdepartment/SubDepartment";
import AddSubDepartment from "./components/subdepartment/AddSubDepartment";
import EditSubDepartment from "./components/subdepartment/EditSubDepartment";

import Employee from "./components/employee/Employee";
import AddEmployee from "./components/employee/AddEmployee";
import EditEmployee from "./components/employee/EditEmployee";

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
							<PrivateRoute exact path="/department" component={Department} />
							<PrivateRoute exact path="/department/add" component={AddDepartment} />
							<PrivateRoute exact path="/department/:id" component={EditDepartment} />
							<PrivateRoute exact path="/subdepartment" component={SubDepartment} />
							<PrivateRoute
								exact
								path="/subdepartment/add"
								component={AddSubDepartment}
							/>
							<PrivateRoute
								exact
								path="/subdepartment/:id"
								component={EditSubDepartment}
							/>
							<PrivateRoute exact path="/employee" component={Employee} />
							<PrivateRoute exact path="/employee/add" component={AddEmployee} />
							<PrivateRoute exact path="/employee/:id" component={EditEmployee} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
