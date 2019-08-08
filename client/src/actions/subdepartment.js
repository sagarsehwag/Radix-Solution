import axios from "axios";
import setAlert from "./alert";

import { GET_SUBDEPARTMENT, GET_SUBDEPARTMENTS, CLEAR_SUBDEPARTMENT } from "./types";

// Load all the subdepartments
export const loadSubDepartments = (subDepartmentArray) => {
	return async (dispatch) => {
		try {
			const {
				data: { subDepartments }
			} = await axios.get("/department/subdepartment/many", { subDepartmentArray });
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
export const clearSubDepartment = (subDepartment) => {
	return async (dispatch) => {
		dispatch({ type: CLEAR_SUBDEPARTMENT });
	};
};