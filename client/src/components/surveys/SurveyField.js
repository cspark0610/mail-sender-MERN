// make a surveyField class component contains login to render single label and text input
import React from "react";

const SurveyField = ({ input, label, meta: { error, touched } }) => {
	// <Field type="text" name="surveyTitle" component="input" />
	// 3th prop component is a function that returns a JSX element as input html tag, or can be a custom Component using {}
	// 2nd prop name any string if type prop is text , we are telling reduxform we are producing a object with key "surveyTitle"
	// {...input} doing this is equivalent to:
	// <input onBlur={input.onBlur} ..etc for each prop of input object />

	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: "5px" }} />
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};
export default SurveyField;
