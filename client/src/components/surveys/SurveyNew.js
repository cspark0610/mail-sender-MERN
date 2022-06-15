// surveyNew shows surveyForm and surveyReview conditionally
import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";

class SurveyNew extends Component {
	// here going to renderize conditionally if i ll show SurveyFormReview
	// equivalente a usar el constructor(props) {super(props); this.state = {showFormReview: false}}
	state = { showFormReview: false };

	render() {
		const { showFormReview } = this.state;
		return (
			<div>
				{showFormReview ? (
					<SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />
				) : (
					<SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
				)}
			</div>
		);
	}
}
// esto se hace para que cuando haga click en Cancel y vuelva a renderizxar el form los valores anteriores queden eliminados
// por default en reduxForm cuando el componente SurveyNew es demontado todos sus valores son eliminados
export default reduxForm({
	form: "surveyForm",
})(SurveyNew);
