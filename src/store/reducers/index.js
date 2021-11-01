import {objectReducer} from "./objectReducer";
import {combineReducers} from "redux";

export const rootReducer = combineReducers({
    object: objectReducer
})