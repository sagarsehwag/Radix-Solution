import axios from "axios";
import setAlert from "./alert";

import { GET_EMPLOYEE, GET_EMPLOYEES, CLEAR_EMPLOYEE, DELETE_EMPLOYEE } from "./types";

// Load all the subdepartments
export const loadEmployees = (subDepartmentId, subDepartmentIds, departmentIds) => {
	return async (dispatch) => {
		try {
			const {
				data: { employees }
			} = await axios.post("/employee/many", {
				subDepartmentId,
				subDepartmentIds,
				departmentIds
			});
			dispatch({ type: GET_EMPLOYEES, payload: employees });
		} catch (error) {
			dispatch({ type: CLEAR_EMPLOYEE });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Create new employee
export const addEmployee = (formData) => {
	return async (dispatch) => {
		try {
			const {
				data: { success, message }
			} = await axios.post("/employee", formData);

			if (success) dispatch(setAlert(message, "success"));
			else dispatch(setAlert(message, "danger"));
		} catch (error) {
			dispatch({ type: CLEAR_EMPLOYEE });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Edit employee
export const editEmployee = (formData, id) => {
	return async (dispatch) => {
		try {
			const {
				data: { success, message }
			} = await axios.put("/employee", { ...formData, id });

			if (success) dispatch(setAlert(message, "success"));
			else dispatch(setAlert(message, "danger"));
		} catch (error) {
			dispatch({ type: CLEAR_EMPLOYEE });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Load the subdepartment
export const getEmployee = (id) => {
	return async (dispatch) => {
		try {
			const {
				data: { employee }
			} = await axios.get(`/employee/${id}`);
			dispatch({ type: GET_EMPLOYEE, payload: employee });
		} catch (error) {
			dispatch({ type: CLEAR_EMPLOYEE });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

export const deleteEmployee = (id) => {
	return async (dispatch) => {
		try {
			const {
				data: { success, message }
			} = await axios.delete(`/employee`, { data: { id } });

			if (success) {
				dispatch({ type: DELETE_EMPLOYEE, payload: id });
				dispatch(setAlert(message, "success"));
			} else dispatch(setAlert(message, "danger"));
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
