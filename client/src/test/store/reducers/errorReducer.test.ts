import errorReducer from "../../../store/reducers/errorReducer";
import { IAction, IError } from "../../../types/interfaces";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  NOT_IMPLEMENTED,
} from "../../../store/actions/types";

describe("Test commentReducer", () => {
  const initialState = {
    msg: {},
    status: null,
    id: null,
  };

  const error: IError = {
    msg: "error__message",
    id: "error_id",
    status: 404,
  };

  it("Test commentReducer without passing initialState", () => {
    const action: IAction = {
      type: GET_ERRORS,
      payload: error,
    };
    const result = errorReducer(undefined, action);
    expect(result).toEqual({ ...error });
  });

  it("Test GET_ERRORS", () => {
    const action: IAction = {
      type: GET_ERRORS,
      payload: error,
    };
    const result = errorReducer(initialState, action);
    expect(result).toEqual({ ...error });
  });

  it("Test CLEAR_ERRORS", () => {
    const action: IAction = {
      type: CLEAR_ERRORS,
    };
    const result = errorReducer(error, action);
    expect(result).toEqual({ ...initialState });
  });

  it("Test default switch statement", () => {
    const action: IAction = {
      type: NOT_IMPLEMENTED,
    };
    const result = errorReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
    });
  });
});
