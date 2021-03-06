import axios from "axios";
import setAlert from "./alert";
// import { checkAdmin } from "./auth";

import {
	GET_DEPARTMENT,
	GET_DEPARTMENTS,
	CLEAR_DEPARTMENT,
	DELETE_DEPARTMENT
} from "./types";

// Load departments via permissions
export const loadDepartments = (isAdmin, permissions) => {
	return async (dispatch) => {
		try {
			if (isAdmin) {
				const {
					data: { departments }
				} = await axios.get("/department");
				dispatch({ type: GET_DEPARTMENTS, payload: departments });
			} else {
				const {
					data: { departments }
				} = await axios.post("/department/many", { departmentNames: permissions });
				dispatch({ type: GET_DEPARTMENTS, payload: departments });
			}
		} catch (error) {
			dispatch({ type: CLEAR_DEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Load department
export const getDepartment = (departmentId) => {
	return async (dispatch) => {
		try {
			const {
				data: { department }
			} = await axios.get(`/department/${departmentId}`);
			dispatch({ type: GET_DEPARTMENT, payload: department });
		} catch (error) {
			dispatch({ type: CLEAR_DEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Add subdepartment
export const addDepartment = (formData) => {
	return async (dispatch) => {
		try {
			const {
				data: { success, message }
			} = await axios.post("/department", formData);
			if (success) {
				dispatch(setAlert(message, "success"));
			} else {
				dispatch(setAlert(message, "danger"));
			}
		} catch (error) {
			dispatch({ type: CLEAR_DEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Edit subdepartment
export const editDepartment = (formData, id) => {
	return async (dispatch) => {
		try {
			const {
				data: { success, message }
			} = await axios.put("/department", { ...formData, id });

			if (success) dispatch(setAlert(message, "success"));
			else dispatch(setAlert(message, "danger"));
		} catch (error) {
			dispatch({ type: CLEAR_DEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

export const deleteDepartment = (id) => {
	return async (dispatch) => {
		try {
			const {
				data: { success, message }
			} = await axios.delete("/department", { data: { id } });

			if (success) {
				dispatch({ type: DELETE_DEPARTMENT, payload: id });
				dispatch(setAlert(message, "success"));
			} else dispatch(setAlert(message, "danger"));
		} catch (error) {
			dispatch({ type: CLEAR_DEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

// Clear department
export const clearDepartment = () => {
	return async (dispatch) => {
		dispatch({ type: CLEAR_DEPARTMENT });
	};
};
