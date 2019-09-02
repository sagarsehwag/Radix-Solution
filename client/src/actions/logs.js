import axios from "axios";
import setAlert from "./alert";

import { GET_LOGS, DELETE_LOG, CLEAR_LOGS } from "./types";

export const getLogs = (departments, subDepartments, page = 1) => {
	return async (dispatch) => {
		try {
			const {
				data: { logs }
			} = await axios.post(`/logs/get`, { departments, subDepartments, page });
			dispatch({ type: GET_LOGS, payload: logs });
		} catch (error) {
			dispatch({ type: CLEAR_LOGS });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

export const addLog = (formData) => {
	return async (dispatch) => {
		try {
			const {
				data: { message }
			} = await axios.post(`/logs`, formData);
			dispatch(setAlert(message, "success"));
		} catch (error) {
			dispatch({ type: CLEAR_LOGS });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

export const deleteLog = (id) => {
	return async (dispatch) => {
		try {
			console.log(id);
			const {
				data: { message }
			} = await axios.delete(`/logs`, { data: { id } });
			dispatch({ type: DELETE_LOG, payload: id });
			dispatch(setAlert(message, "success"));
		} catch (error) {
			dispatch({ type: CLEAR_LOGS });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};
