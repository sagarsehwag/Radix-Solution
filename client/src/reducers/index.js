import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import department from "./department";
import subdepartment from "./subdepartment";
import employee from "./employee";

export default combineReducers({ alert, auth, department, subdepartment, employee });
