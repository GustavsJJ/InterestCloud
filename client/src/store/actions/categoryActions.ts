import axios from "axios";
import { GET_CATEGORIES } from "./types";
import { returnErrors } from "./errorActions";

export const getCategories = () => (dispatch: Function) => {
  axios
    .get("/api/categories")
    .then((res) => {
      dispatch({ type: GET_CATEGORIES, payload: res.data });
    })
    .catch((err: any) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
