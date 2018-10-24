import { combineReducers } from "redux";
import user from "./user_reducer";
import books from "./book_reduces";

const rootReducer = combineReducers({ user, books });

export default rootReducer;
