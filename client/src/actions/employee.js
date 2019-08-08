import axios from "axios";
import setAlert from "./alert";

import { GET_EMPLOYEE, GET_EMPLOYEES, CLEAR_EMPLOYEE } from "./types";

// Load all the subdepartments
export const loadEmployees = (employeeArray) => {
	return async (dispatch) => {
		try {
			console.log(employeeArray);
			const {
				data: { employees }
			} = await axios.post("/employee/many", { employeeArray });
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
