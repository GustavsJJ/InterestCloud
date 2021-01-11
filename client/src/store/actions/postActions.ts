import axios from "axios";
import {
  GET_POSTS,
  POSTS_LOADING,
  GET_POST,
  DELETE_POST,
  POST_LOADING,
  LIKE_POST,
} from "./types";
import { getHeaderConfig } from "./authActions";

interface createPostProps {
  title: string;
  text: string;
  imageId: string;
  categories: string[];
  file: any;
}

export const getPosts = (sortBy?: string) => (
  dispatch: Function,
  getState: Function
) => {
  dispatch({ type: POSTS_LOADING });
  const config = getHeaderConfig(getState());
  if (!sortBy) {
    axios
      .get("/api/posts", config)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err: any) => {
        console.error(err.response?.data, err.response?.status);
      });
  } else {
    axios
      .get(`/api/posts/sortBy=${sortBy}`, config)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err: any) => {
        console.error(err.response?.data, err.response?.status);
      });
  }
};

export const getPostById = (id: string) => (
  dispatch: Function,
  getState: Function
) => {
  const config = getHeaderConfig(getState());
  // disabling cache to check if post liked
  config.headers["Cache-Control"] = "no-cache";
  config.headers["Pragma"] = "no-cache";
  config.headers["Expires"] = "0";
  dispatch({ type: POST_LOADING });
  axios
    .get("/api/posts/" + id, config)
    .then((res) => {
      dispatch({ type: GET_POST, payload: res.data });
    })
    .catch((err: any) => {
      window.location.href = "/oops";
    });
};

export const createPost = (
  { title, text, imageId, categories, file }: createPostProps,
  onError: Function,
  onSuccess: Function
) => (dispatch: Function, getState: Function) => {
  const config = getHeaderConfig(getState());
  const body = JSON.stringify({ title, text, imageId, categories });
  // post creation
  axios
    .post("/api/posts", body, config)
    .then((res) => {
      const formData = new FormData();
      formData.append("image", file);
      config.headers["content-type"] = "multipart/form-data";
      const postId = res.data._id;

      // image creation
      axios
        .post("/api/images", formData, config)
        .then((res) => {
          const imageId = res.data.file.id;
          config.headers["content-type"] = "application/json";
          const body = { imageId: imageId };
          // updating post imageId field
          axios
            .patch(`/api/posts/${postId}`, body, config)
            .then((res) => {
              // post created successfully
              onSuccess("Post has been created");
            })
            .catch((err) => {
              // updating post imageId field failed
              axios.delete(`/api/posts/${postId}`, config);
              onError(err.response.data);
            });
        })
        .catch((err) => {
          config.headers["content-type"] = "application/json";
          axios.delete(`/api/posts/${postId}`, config);
          onError(err.response.data);
        });
    })
    .catch((err) => {
      onError(err.response.data);
    });
};

export const likePost = (id: string) => (
  dispatch: Function,
  getState: Function
) => {
  const config = getHeaderConfig(getState());
  axios
    .get(`/api/posts/${id}/like`, config)
    .then((res) => {
      dispatch({ type: LIKE_POST });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const deletePost = (id: string) => (
  dispatch: Function,
  getState: Function
) => {
  const config = getHeaderConfig(getState());
  axios
    .delete(`/api/posts/${id}`, config)
    .then((res) => {
      dispatch({ type: DELETE_POST, payload: id });
      alert("Post deleted");
    })
    .catch((err) => {
      console.error(err);
    });
};
