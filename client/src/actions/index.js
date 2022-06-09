// create an iniital action creator
import axios from "axios";
import { FETCH_USER } from "./types";

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
