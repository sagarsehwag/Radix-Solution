import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

const setAlert = (message, alertType, timeOut = 5000) => {
	return async (dispatch) => {
		const id = uuid.v4();
		dispatch({ type: SET_ALERT, payload: { message, alertType, id } });

		// Remove alert after 5 seconds
		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeOut);
	};
};

export default setAlert;
