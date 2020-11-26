import axios from "axios";
import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING } from "./types";
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
