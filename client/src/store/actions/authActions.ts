import axios, { AxiosRequestConfig } from "axios";
import { returnErrors } from "./errorActions";

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

interface registerProps {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface loginProps {
  email: string;
  password: string;
}

// Check token & load user
export const loadUser = () => (dispatch: Function, getState: Function) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", getHeaderConfig(getState()))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register user
export const register = ({ name, surname, email, password }: registerProps) => (
  dispatch: Function
) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({ name, surname, email, password });
  axios
    .post("/api/users", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      window.location.href = "/";
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login user
export const login = ({ email, password }: loginProps) => (
  dispatch: Function
) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  axios
    .post("/api/auth", body, config)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      window.location.href = "/";
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout user
export const logout = () => (dispatch: Function) => {
  dispatch({ type: LOGOUT_SUCCESS });
  window.location.href = "/";
};

export const deleteSelf = () => (dispatch: Function, getState: Function) => {
  axios
    .get("/api/users/deleteSelf", getHeaderConfig(getState()))
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS });
      window.location.href = "/";
    })
    .catch((err) => {
      alert("Problem occcured deleting profile. Please try again.");
    });
};

// Sets header config with token
export const getHeaderConfig = (state: any) => {
  const token = state.auth.token;
  const config: AxiosRequestConfig = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (token) config.headers["x-auth-token"] = token;

  return config;
};
