import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
} from "../actions/types";

const initialState = {
  posts: [],
  postsLoading: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        postsLoading: false,
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
    case POSTS_LOADING:
      return {
        ...state,
        postsLoading: true,
      };
    default:
      return state;
  }
}
