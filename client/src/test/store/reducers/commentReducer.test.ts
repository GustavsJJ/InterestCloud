import commentReducer from "../../../store/reducers/commentReducer";
import { IAction, IComment } from "../../../types/interfaces";
import {
  GET_COMMENTS,
  ADD_COMMENT,
  NOT_IMPLEMENTED,
} from "../../../store/actions/types";

describe("Test commentReducer", () => {
  const initialState = {
    comments: [],
  };

  const comments: IComment[] = [
    {
      _id: "comment_id",
      authorId: {
        _id: "author_id",
        name: "name_string",
        surname: "name_string",
      },
      date: new Date(),
      postId: "post_id",
      text: "comment_text",
    },
  ];

  it("Test commentReducer without passing initialState", () => {
    const action: IAction = {
      type: GET_COMMENTS,
      payload: comments,
    };
    const result = commentReducer(undefined, action);
    expect(result).toEqual({ comments });
  });

  it("Test GET_COMMENTS", () => {
    const action: IAction = {
      type: GET_COMMENTS,
      payload: comments,
    };
    const result = commentReducer(initialState, action);
    expect(result).toEqual({ comments });
  });

  it("Test ADD_COMMENT", () => {
    const comment: IComment = {
      _id: "comment_2_id",
      authorId: {
        _id: "author_id",
        name: "name_string",
        surname: "name_string",
      },
      date: new Date(),
      postId: "post_id",
      text: "comment_2_text",
    };

    const action: IAction = {
      type: ADD_COMMENT,
      payload: comment,
    };
    const result = commentReducer(initialState, action);
    expect(result).toEqual({ comments: [comment] });
  });

  it("Test default switch statement", () => {
    const action: IAction = {
      type: NOT_IMPLEMENTED,
    };
    const result = commentReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
    });
  });
});
