import axios from "axios";
import {
  GET_POSTS,
  POSTS_LOADING,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  POST_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";

export const getPosts = () => (dispatch: Function) => {
  dispatch({ type: POSTS_LOADING });
  axios
    .get("/api/posts")
    .then((res) => {
      dispatch({ type: GET_POSTS, payload: res.data });
    })
    .catch((err: any) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getPostById = (id: string) => (dispatch: Function) => {
  dispatch({ type: POST_LOADING });
  axios
    .get("/api/posts/" + id)
    .then((res) => {
      dispatch({ type: GET_POST, payload: res.data });
    })
    .catch((err: any) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
