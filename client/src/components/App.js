import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
// component imports
import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
};
const SurveyNew = () => {
	return (
		<div>
			<h1>SurveyNew</h1>
		</div>
	);
};

class App extends Component {
	// en el momento en que se monta el componente App quiero ejecutar la accion fetchUser
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						{/* always show header */}
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
