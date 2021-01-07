import { IAction } from "../../types/interfaces";
import { GET_COMMENTS, ADD_COMMENT } from "../actions/types";

const initialState = {
  comments: [],
};

export default function (state = initialState, action: IAction) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    default:
      return state;
  }
}
