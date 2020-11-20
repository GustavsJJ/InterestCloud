import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

interface ErrorsAction {
  type: typeof GET_ERRORS | typeof CLEAR_ERRORS;
  payload: {
    msg: string | null | undefined;
    status: number | null | undefined;
    id: any;
  };
}

const initialState = {
  msg: {},
  status: null,
  id: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
