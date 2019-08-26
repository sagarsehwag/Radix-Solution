import {
	GET_SUBDEPARTMENT,
	GET_SUBDEPARTMENTS,
	CLEAR_SUBDEPARTMENT
} from "../actions/types";

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
				subDepartment: payload,
				loading: false
			};
		case GET_SUBDEPARTMENTS:
			return {
				...state,
				subDepartments: payload,
				loading: false
			};
		case CLEAR_SUBDEPARTMENT:
			return {
				subDepartment: null,
				subDepartments: [],
				loading: false
			};
		default:
			return state;
	}
}
