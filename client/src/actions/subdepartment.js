import axios from "axios";
import setAlert from "./alert";

import {
	GET_SUBDEPARTMENT,
	GET_SUBDEPARTMENTS,
	CLEAR_SUBDEPARTMENT,
	DELETE_SUBDEPARTMENT
} from "./types";

// Load all the subdepartments
export const loadSubDepartments = (departmentId, departmentIds) => {
	return async (dispatch) => {
		try {
			const {
				data: { subDepartments }
			} = await axios.post("/department/subdepartment/many", {
				departmentId,
				departmentIds
			});
			dispatch({ type: GET_SUBDEPARTMENTS, payload: subDepartments });
		} catch (error) {
			dispatch({ type: CLEAR_SUBDEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Load the subdepartment
export const getSubDepartment = (id) => {
	return async (dispatch) => {
		try {
			const {
				data: { subDepartment }
			} = await axios.get(`/department/subdepartment/${id}`);
			dispatch({ type: GET_SUBDEPARTMENT, payload: subDepartment });
		} catch (error) {
			dispatch({ type: CLEAR_SUBDEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Add department
export const addSubDepartment = (formData) => {
	return async (dispatch) => {
		try {
			const {
				data: { success, message }
			} = await axios.post("/department/subdepartment", formData);
			if (success) {
				dispatch(setAlert(message, "success"));
			} else {
				dispatch(setAlert(message, "danger"));
			}
		} catch (error) {
			dispatch({ type: CLEAR_SUBDEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Edit department
export const editSubDepartment = (formData, id) => {
	return async (dispatch) => {
		try {
			const {
				data: { success, message }
			} = await axios.put("/department/subdepartment", { ...formData, id });

			if (success) dispatch(setAlert(message, "success"));
			else dispatch(setAlert(message, "danger"));
		} catch (error) {
			dispatch({ type: CLEAR_SUBDEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

export const deleteSubDepartment = (id) => {
	return async (dispatch) => {
		try {
			console.log(id);
			const {
				data: { success, message }
			} = await axios.delete("/department/subdepartment", { data: { id } });
			if (success) {
				dispatch({ type: DELETE_SUBDEPARTMENT, payload: id });
				dispatch(setAlert(message, "success"));
			} else dispatch(setAlert(message, "danger"));
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
