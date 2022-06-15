import React from "react";
import { connect } from "react-redux";
import { FIELDS } from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({ onCancel, submitSurvey, formValues, history }) => {
	const reviewFields = FIELDS.map(({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please confirm your entries.</h5>
			<div>{reviewFields}</div>
			<button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
				Back
			</button>
			<button className="green white-text btn-flat right" onClick={() => submitSurvey(formValues, history)}>
				Send Survey
				<i className="material-icons roght">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	/*
  going to receive as state = { auth: {} , form: {surveyForm: { values: {} }}} as combined reducers
  surveyForm is the name chosen when registering our reduxForm
  */
	return {
		formValues: state.form.surveyForm.values,
	};
	// now when we connect to SurveyFormReview we can use this.props.formValues
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
