import axios from "axios";
import setAlert from "./alert";
import setAuthToken from "../utils/setAuthToken";

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT,
	ADMIN,
	CLEAR_DEPARTMENT,
	CLEAR_SUBDEPARTMENT,
	CLEAR_EMPLOYEE
} from "./types";

// Load User
export const loadUser = () => {
	return async (dispatch) => {
		try {
			setAuthToken();
			const {
				data: { user }
			} = await axios.get("/auth");

			dispatch({
				type: USER_LOADED,
				payload: user
			});
			dispatch(checkAdmin());
		} catch (error) {
			dispatch({ type: AUTH_ERROR });
		}
	};
};

export const login = (formData) => {
	return async (dispatch) => {
		try {
			const {
				data: { user, token }
			} = await axios.post("/auth", formData);

			dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
			dispatch(checkAdmin());
		} catch (error) {
			dispatch({ type: LOGIN_FAIL });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

export const logout = (history) => {
	return async (dispatch) => {
		dispatch({ type: CLEAR_DEPARTMENT });
		dispatch({ type: CLEAR_SUBDEPARTMENT });
		dispatch({ type: CLEAR_EMPLOYEE });
		dispatch({ type: LOGOUT });
		dispatch(setAlert("You're logged out", "success"));
		history.push("/");
	};
};

export const register = (formData) => {
	return async (dispatch) => {
		try {
			const {
				data: { user, token }
			} = await axios.post("/auth/register", formData);

			dispatch({ type: REGISTER_SUCCESS, payload: { user, token } });
		} catch (error) {
			dispatch({ type: REGISTER_FAIL });
			dispatch(setAlert(error.response.data.message, "danger"));
		}
	};
};

export const checkAdmin = () => {
	return async (dispatch) => {
		try {
			const {
				data: { isAdmin }
			} = await axios.get("/auth/isadmin");
			dispatch({ type: ADMIN, payload: isAdmin });
		} catch (error) {
			dispatch({ type: ADMIN, payload: false });
		}
	};
};
