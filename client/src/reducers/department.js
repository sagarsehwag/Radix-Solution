import { GET_DEPARTMENT } from "../actions/types";

const initialState = {
	department: null,
	departments: [],
	allDepartments: [],
	loading: true
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_DEPARTMENT:
			return {
				...state,
				department: payload,
				loading: false
			};
		case GET_DEPARTMENTS:
			return {
				...state,
				departments: payload,
				loading: false
			};
		case GET_ALL_DEPARTMENTS: {
			return {
				...state,
				allDepartments: payload,
				loading: false
			};
		}
		case CLEAR_DEPARTMENT:
			return {
				department: null,
				departments: [],
				loading: false
			};
		default:
			return state;
	}
}
