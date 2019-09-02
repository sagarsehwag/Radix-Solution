import { GET_LOGS, CLEAR_LOGS, DELETE_LOG } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_LOGS:
			return payload;
		case DELETE_LOG:
			return state.filter(({ _id }) => _id !== payload);
		case CLEAR_LOGS:
			return [];
		default:
			return state;
	}
}
