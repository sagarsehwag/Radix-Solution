import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./components/auth/Login";
import Navbar from "./components/Layout/Navbar";
import store from "./store/store";

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Fragment>
						<Navbar />
						<section className="container">
						<Switch>
							<Route exact path="/" component={Login} />
						</Switch>
						</section>
					</Fragment>
				</Router>
			</Provider>
		);
	}
}
