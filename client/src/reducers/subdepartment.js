import { GET_SUBDEPARTMENT, GET_SUBDEPARTMENTS } from "../actions/types";

const initialState = {
	subDepartment: null,
	subDepartments: [],
	loading: true
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_SUBDEPARTMENT:
			return {
				...state,
				subDepartment: payload
			};
		case GET_SUBDEPARTMENTS:
			return {
				...state,
				subDepartments: payload
			};
		case CLEAR_SUBDEPARTMENT:
			return {
				subDepartment: null,
				subDepartments: []
			};
		default:
			return state;
	}
}
