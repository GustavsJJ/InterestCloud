import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// returns errors
export const returnErrors = (
  msg: String | null | undefined,
  status: Number | null | undefined,
  id: any = null
) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
