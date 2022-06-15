import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import { Link } from "react-router-dom";
import { FIELDS } from "./formFields";

class SurveyForm extends Component {
	renderFields() {
		return (
			<>
				{FIELDS.map(({ name, label }) => {
					return <Field key={name} label={label} name={name} component={SurveyField} type="text" />;
				})}
			</>
		);
	}

	// this.props.handleSubmit(callback inside SurveyNew component) it s provided by reduxForm
	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(() => this.props.onSurveySubmit())}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};
	if (values.recipients) {
		errors.recipients = validateEmails(values.recipients || "");
	}

	FIELDS.forEach(({ name }) => {
		if (!values[name]) {
			errors[name] = `You must provide a ${name}`;
		}
	});
	return errors;
}

export default reduxForm({
	validate: validate,
	form: "surveyForm",
	// para que persistan los datos cuando hago click en el back
	destroyOnUnmount: false,
})(SurveyForm);
