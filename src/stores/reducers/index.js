import { combineReducers } from "redux";
import TodoReducer from "./TodoReducer";

const rootReducer = combineReducers({
    TodoReducer:TodoReducer,
});
export default rootReducer;
