import {
	GET_DEPARTMENT,
	GET_DEPARTMENTS,
	CLEAR_DEPARTMENT,
	DELETE_DEPARTMENT
} from "../actions/types";

const initialState = {
	department: null,
	departments: [],
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
		case DELETE_DEPARTMENT:
			return {
				...state,
				departments: state.departments.filter(({ _id }) => _id !== payload),
				loading: false
			};
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
