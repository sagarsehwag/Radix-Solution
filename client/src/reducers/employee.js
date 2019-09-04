import {
	GET_EMPLOYEE,
	GET_EMPLOYEES,
	CLEAR_EMPLOYEE,
	DELETE_EMPLOYEE
} from "../actions/types";

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
				employee: payload,
				loading: false
			};
		case GET_EMPLOYEES:
			return {
				...state,
				employees: payload,
				loading: false
			};
		case DELETE_EMPLOYEE:
			return {
				...state,
				employees: state.employees.filter(({ _id }) => _id !== payload),
				loading: false
			};
		case CLEAR_EMPLOYEE:
			return {
				employee: null,
				employees: [],
				loading: false
			};
		default:
			return state;
	}
}
