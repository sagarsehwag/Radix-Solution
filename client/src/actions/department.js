import axios from "axios";
import setAlert from "./alert";
// import { checkAdmin } from "./auth";

import {
	GET_DEPARTMENT,
	GET_DEPARTMENTS,
	CLEAR_DEPARTMENT,
	GET_ALL_DEPARTMENTS
} from "./types";

// Load all the departments
export const loadAllDepartments = () => {
	return async (dispatch) => {
		try {
			const {
				data: { departments }
			} = await axios.get("/department");
			dispatch({ type: GET_ALL_DEPARTMENTS, payload: departments });
		} catch (error) {
			dispatch({ type: CLEAR_DEPARTMENT });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

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
export const loadDepartment = (department) => {
	return async (dispatch) => {
		try {
			dispatch({ type: GET_DEPARTMENT, payload: department });
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
