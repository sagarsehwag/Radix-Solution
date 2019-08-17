import axios from "axios";
import setAlert from "./alert";

import { GET_EMPLOYEE, GET_EMPLOYEES, CLEAR_EMPLOYEE } from "./types";

// Load all the subdepartments
export const loadEmployees = (subDepartmentId) => {
	return async (dispatch) => {
		try {
			const {
				data: { employees }
			} = await axios.post("/employee/many", { subDepartmentId });
			dispatch({ type: GET_EMPLOYEES, payload: employees });
		} catch (error) {
			dispatch({ type: CLEAR_EMPLOYEE });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Load the subdepartment
export const loadEmployee = (employee) => {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_EMPLOYEE, payload: employee });
		} catch (error) {
			dispatch({ type: CLEAR_EMPLOYEE });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Clear subdepartment
export const clearEmployee = () => {
	return async (dispatch) => {
		dispatch({ type: CLEAR_EMPLOYEE });
	};
};
