import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
} from "../actions/types";

type actionType =
  | typeof AUTH_ERROR
  | typeof LOGIN_SUCCESS
  | typeof LOGOUT_SUCCESS
  | typeof REGISTER_SUCCESS
  | typeof LOGIN_FAIL
  | typeof REGISTER_FAIL
  | typeof USER_LOADING
  | typeof USER_LOADED;

interface AuthAction {
  type: actionType;
  payload: {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: any;
    token: string | null;
  };
}

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      const token = action.payload.token ? action.payload.token : "";
      localStorage.setItem("token", token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}