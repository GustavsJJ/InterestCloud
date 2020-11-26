// USER ACTIONS
export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

// ERROR ACTIONS
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

// POST ACTIONS
export const GET_POSTS = "GET_ITEMS";
export const ADD_POST = "ADD_ITEMS";
export const DELETE_POST = "DELETE_ITEM";
export const POSTS_LOADING = "ITEMS_LOADING";

// type actionType =
//   | typeof AUTH_ERROR
//   | typeof LOGIN_SUCCESS
//   | typeof LOGOUT_SUCCESS
//   | typeof REGISTER_SUCCESS
//   | typeof LOGIN_FAIL
//   | typeof REGISTER_FAIL
//   | typeof USER_LOADING
//   | typeof USER_LOADED;

// export default interface authAction {
//   type: actionType;
//   payload: {
//     isAuthenticated: boolean;
//     isLoading: boolean;
//     user: any;
//     token: String | null;
//   };
// }