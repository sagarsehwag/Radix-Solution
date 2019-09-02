import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import department from "./department";
import subdepartment from "./subdepartment";
import employee from "./employee";
import logs from "./logs";

export default combineReducers({
	alert,
	auth,
	department,
	subdepartment,
	employee,
	logs
});
