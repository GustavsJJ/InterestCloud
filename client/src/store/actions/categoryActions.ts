import axios from "axios";
import { ADD_POINTS, GET_CATEGORIES, RESET_POINTS } from "./types";
import { getHeaderConfig } from "./authActions";

// gets all categories
export const getCategories = () => (dispatch: Function, getState: Function) => {
  const config = getHeaderConfig(getState());
  axios
    .get("/api/categories", config)
    .then((res) => {
      dispatch({ type: GET_CATEGORIES, payload: res.data });
    })
    .catch((err: any) => {
      console.error(err.response.data, err.response.status);
    });
};

// adds or removes points to specified category
export const addPoints = (categoryId: string, points: number) => (
  dispatch: Function,
  getState: Function
) => {
  const config = getHeaderConfig(getState());
  const body = JSON.stringify({ categoryId, points });
  axios
    .post("/api/categories/addPoints", body, config)
    .then((res) => dispatch({ type: ADD_POINTS, payload: res.data }))
    .catch((err) => {
      console.error(err.response.data, err.response.status);
    });
};

// sets points of all categories to 0 for current user
export const resetPoints = () => (dispatch: Function, getState: Function) => {
  const config = getHeaderConfig(getState());
  axios
    .get("/api/categories/resetPoints", config)
    .then((res) => {
      dispatch({ type: RESET_POINTS });
    })
    .catch((err) => {
      console.error(err.response.data, err.response.status);
    });
};
