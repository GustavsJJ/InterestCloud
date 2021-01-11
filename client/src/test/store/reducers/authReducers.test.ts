import authReducer from "../../../store/reducers/authReducer";
import { IAction } from "../../../types/interfaces";
import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  UPDATE_PROFILE,
  NOT_IMPLEMENTED,
} from "../../../store/actions/types";

describe("Test authReducer", () => {
  const initialState = {
    token: "token_string",
    isAuthenticated: false,
    isLoading: false,
    user: {
      name: "",
      surname: "",
      role: "",
    },
  };

  it("Test authReducer without passing initialState", () => {
    const action: IAction = {
      type: USER_LOADING,
    };
    const result = authReducer(undefined, action);
    expect(result).toEqual({ ...initialState, token: null, isLoading: true });
  });

  it("Test USER_LOADING", () => {
    const action: IAction = {
      type: USER_LOADING,
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({ ...initialState, isLoading: true });
  });

  it("Test USER_LOADED", () => {
    const user = {
      name: "user_name",
      surname: "user_surname",
      email: "user_email",
    };
    const action: IAction = {
      type: USER_LOADED,
      payload: user,
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: true,
      user: user,
    });
  });

  it("Test LOGIN_SUCCESS", () => {
    const token = "token_string";
    const user = {
      name: "user_name",
      surname: "user_surname",
      email: "user_email",
    };
    const action: IAction = {
      type: LOGIN_SUCCESS,
      payload: { user, token },
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: true,
      user,
      token,
    });
  });

  it("Test LOGIN_SUCCESS without user name and token", () => {
    const user = {
      surname: "user_surname",
      email: "user_email",
    };
    const action: IAction = {
      type: LOGIN_SUCCESS,
      payload: { user },
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: true,
      user,
    });
  });

  it("Test REGISTER_SUCCESS", () => {
    const token = "token_string";
    const user = {
      name: "user_name",
      surname: "user_surname",
      email: "user_email",
    };
    const action: IAction = {
      type: REGISTER_SUCCESS,
      payload: { user, token },
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      isLoading: false,
      isAuthenticated: true,
      user,
      token,
    });
  });

  it("Test AUTH_ERROR", () => {
    const action: IAction = {
      type: AUTH_ERROR,
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it("Test LOGIN_FAIL", () => {
    const action: IAction = {
      type: LOGIN_FAIL,
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it("Test LOGOUT_SUCCESS", () => {
    const action: IAction = {
      type: LOGOUT_SUCCESS,
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it("Test REGISTER_FAIL", () => {
    const action: IAction = {
      type: REGISTER_FAIL,
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it("Test UPDATE_PROFILE", () => {
    const user = {
      name: "user_name",
      surname: "user_surname",
      email: "user_email",
    };
    const action: IAction = {
      type: UPDATE_PROFILE,
      payload: user,
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      user: { ...user, role: "" },
    });
  });

  it("Test default switch statement", () => {
    const action: IAction = {
      type: NOT_IMPLEMENTED,
    };
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
    });
  });
});
