import postReducer from "../../../store/reducers/postReducer";
import { IAction, IPost } from "../../../types/interfaces";
import {
  GET_POSTS,
  POSTS_LOADING,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  POST_LOADING,
  LIKE_POST,
  NOT_IMPLEMENTED,
} from "../../../store/actions/types";

describe("Test commentReducer", () => {
  const initialState = {
    posts: [],
    postsLoading: false,
    post: {
      liked: false,
    },
    postLoading: false,
  };

  const posts: IPost[] = [
    {
      date: new Date(),
      categoryIds: ["category_1_id", "category_2_id", "category_3_id"],
      _id: "post_1_id",
      title: "Title_1_description",
      description: "Post_1_description",
      author: "author_1_name",
      imageId: "image_1_id",
    },
    {
      date: new Date(),
      categoryIds: ["category_2_id", "category_4_id"],
      _id: "post_2_id",
      title: "Title_2_description",
      description: "Post_2_description",
      author: "author_2_name",
      imageId: "image_2_id",
    },
  ];

  it("Test commentReducer without passing initialState", () => {
    const action: IAction = {
      type: GET_POSTS,
      payload: [...posts],
    };
    const result = postReducer(undefined, action);
    expect(result).toEqual({ ...initialState, posts: [...posts] });
  });

  it("Test GET_POSTS", () => {
    const action: IAction = {
      type: GET_POSTS,
      payload: [...posts],
    };
    const result = postReducer(initialState, action);
    expect(result).toEqual({ ...initialState, posts: [...posts] });
  });

  it("Test POSTS_LOADING", () => {
    const action: IAction = {
      type: POSTS_LOADING,
    };
    const result = postReducer(initialState, action);
    expect(result).toEqual({ ...initialState, postsLoading: true });
  });

  it("Test GET_POST", () => {
    const action: IAction = {
      type: GET_POST,
      payload: { ...posts[0] },
    };
    const result = postReducer(initialState, action);
    expect(result).toEqual({ ...initialState, post: { ...posts[0] } });
  });

  it("Test DELETE_POST", () => {
    const state = { ...initialState, posts: [...posts] };
    const action: IAction = {
      type: DELETE_POST,
      payload: "post_1_id",
    };
    const result = postReducer(state, action);
    expect(result).toEqual({ ...initialState, posts: [posts[1]] });
  });

  it("Test ADD_POST", () => {
    const state = { ...initialState, posts: [posts[1]] };
    const action: IAction = {
      type: ADD_POST,
      payload: posts[0],
    };
    const result = postReducer(state, action);
    expect(result).toEqual({ ...state, posts: [...posts] });
  });

  it("Test POST_LOADING", () => {
    const action: IAction = {
      type: POST_LOADING,
    };
    const result = postReducer(initialState, action);
    expect(result).toEqual({ ...initialState, postLoading: true });
  });

  it("Test LIKE_POST", () => {
    const action: IAction = {
      type: LIKE_POST,
    };
    const result = postReducer(initialState, action);
    expect(result).toEqual({ ...initialState, post: { liked: true } });
  });

  it("Test default switch statement", () => {
    const action: IAction = {
      type: NOT_IMPLEMENTED,
    };
    const result = postReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
    });
  });
});
