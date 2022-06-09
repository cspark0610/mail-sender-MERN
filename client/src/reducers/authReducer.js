import { FETCH_USER } from "../actions/types";

const authReducer = (state = null, action) => {
	switch (action.type) {
		// si me llega action.payload como "" quiero retornar false
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
};
export default authReducer;
