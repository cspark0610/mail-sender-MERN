import React from "react";
import { Link } from "react-router-dom";
import SurveyList from "./surveys/SurveyList";

const Dashboard = () => {
	return (
		<>
			<div>
				<SurveyList />
			</div>
			<div className="fixed-action-btn">
				<Link to="/surveys/new" class="btn-floating red btn-large">
					<i className="material-icons">add</i>
				</Link>
			</div>
		</>
	);
};

export default Dashboard;
