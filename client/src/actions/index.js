// create an iniital action creator
import axios from "axios";
import { FETCH_SURVEYS, FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/current_user");
		dispatch({ type: FETCH_USER, payload: res.data });
	} catch (error) {
		console.log(error, "error fetchUser");
	}
};

export const handleToken = (token) => async (dispatch) => {
	try {
		const res = await axios.post("/api/stripe", token);
		dispatch({ type: FETCH_USER, payload: res.data });
	} catch (error) {
		console.log(error, "error handleToken");
	}
};

export const submitSurvey = (values, history) => async (dispatch) => {
	try {
		const res = await axios.post("/api/surveys", values);
		history.push("/surveys");
		console.log(res, "res aca");
		dispatch({ type: FETCH_USER, payload: res.data });
	} catch (error) {
		console.log(error, "error submitSurvey");
	}
};

// make an action creator that fetch all surveys
export const fetchSurveys = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/surveys");
		//res.data sera un array de surveys
		dispatch({ type: FETCH_SURVEYS, payload: res.data });
	} catch (error) {
		console.log(error, "error fetchSurveys");
	}
};
