import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  post: postReducer,
  category: categoryReducer,
});
