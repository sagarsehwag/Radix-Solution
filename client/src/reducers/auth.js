import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	ACCOUNT_DELETED,
	ADMIN
} from "../actions/types";
import setAuthToken from "../utils/setAuthToken";

const initialState = {
	token: localStorage.getItem("token"),
	user: null,
	isAuthenticated: false,
	isAdmin: false,
	loading: true
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				user: payload,
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem("token", payload.token);
			setAuthToken();
			return {
				...state,
				token: payload.token,
				user: payload.user,
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
		case ACCOUNT_DELETED:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isAdmin: false,
				loading: false
			};
		case ADMIN:
			return {
				...state,
				isAdmin: payload
			};
		default:
			return state;
	}
}
