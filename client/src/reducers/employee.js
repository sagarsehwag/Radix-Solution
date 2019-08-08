import { GET_EMPLOYEE, GET_EMPLOYEES, CLEAR_EMPLOYEE } from "../actions/types";

const initialState = {
	employee: null,
	employees: [],
	loading: true
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_EMPLOYEE:
			return {
				...state,
				employee: payload
			};
		case GET_EMPLOYEES:
			return {
				...state,
				employees: payload
			};
		case CLEAR_EMPLOYEE:
			return {
				employee: null,
				employees: []
			};
		default:
			return state;
	}
}
