import axios from "axios";
import { GET_COMMENTS, ADD_COMMENT } from "./types";
import { getHeaderConfig } from "./authActions";

// gets comments of a specific post
export const getComments = (postId: string) => (dispatch: Function) => {
  axios
    .get(`/api/comments/${postId}`)
    .then((res) => {
      dispatch({ type: GET_COMMENTS, payload: res.data });
    })
    .catch((err: any) => {});
};

// adds comment to a specific post
export const addComment = (
  postId: string,
  comment: string,
  callback: Function
) => (dispatch: Function, getState: Function) => {
  const config = getHeaderConfig(getState());
  const body = { comment };
  axios
    .post(`/api/comments/${postId}`, body, config)
    .then((res) => {
      dispatch({ type: ADD_COMMENT, payload: res.data });
      callback("Comment added", false);
    })
    .catch((err: any) => {
      callback(err.response.data, true);
    });
};
