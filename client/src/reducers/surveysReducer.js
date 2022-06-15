import { FETCH_SURVEYS } from "../actions/types";

//make and reducer that fetch all surveys
const surveysReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload;
		default:
			return state;
	}
};
export default surveysReducer;
