import axios from "axios";
import setAlert from "./alert";

import { GET_SUBDEPARTMENT, GET_SUBDEPARTMENTS, CLEAR_SUBDEPARTMENT } from "./types";

// Load all the subdepartments
export const loadSubDepartments = (departmentId) => {
	return async (dispatch) => {
		try {
			const {
				data: { subDepartments }
			} = await axios.post("/department/subdepartment/many", { departmentId });
			dispatch({ type: GET_SUBDEPARTMENTS, payload: subDepartments });
		} catch (error) {
			dispatch({ type: CLEAR_SUBDEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Load the subdepartment
export const loadSubDepartment = (subDepartment) => {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_SUBDEPARTMENT, payload: subDepartment });
		} catch (error) {
			dispatch({ type: CLEAR_SUBDEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Clear subdepartment
export const clearSubDepartment = () => {
	return async (dispatch) => {
		dispatch({ type: CLEAR_SUBDEPARTMENT });
	};
};
