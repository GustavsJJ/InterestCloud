import { IAction } from "../../types/interfaces";
import {
  GET_POSTS,
  POSTS_LOADING,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  POST_LOADING,
} from "../actions/types";

const initialState = {
  posts: [],
  postsLoading: false,
  post: {},
  postLoading: false,
};

export default function (state = initialState, action: IAction) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        postsLoading: false,
      };
    case POSTS_LOADING:
      return {
        ...state,
        postsLoading: true,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        postLoading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: any) => post._id !== action.payload),
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case POST_LOADING:
      return {
        ...state,
        postLoading: true,
      };

    default:
      return state;
  }
}
