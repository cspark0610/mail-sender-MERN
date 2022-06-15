import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}
	renderSurveys() {
		return this.props.surveys.reverse().map((survey) => {
			return (
				<div className="card blue-grey darken-1" key={survey._id}>
					<div className="card-content white-text">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
					</div>
					<div className="card-action">
						<a href="/api/surveys">Yes: {survey.yes}</a>
						<a href="/api/surveys">No: {survey.no}</a>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div>{this.props.surveys.length > 0 ? this.renderSurveys() : null}</div>;
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}
// hace to connect mapStateToProps with action creator function
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
