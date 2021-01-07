import axios from "axios";
import { UPDATE_PROFILE } from "./types";
import { getHeaderConfig } from "./authActions";

export const updateProfile = (
  name: string,
  surname: string,
  email: string,
  callBack: Function
) => (dispatch: Function, getState: Function) => {
  const config = getHeaderConfig(getState());
  const body = { name, surname, email };
  axios
    .patch("/api/users/updateProfile", body, config)
    .then((res) => {
      dispatch({ type: UPDATE_PROFILE, payload: res.data });
      callBack("Profile updated", false);
    })
    .catch((err: any) => {
      callBack(err.response.data, true);
    });
};

export const changePassword = (
  oldPassword: string,
  newPassword: string,
  callBack: Function
) => (dispatch: Function, getState: Function) => {
  const config = getHeaderConfig(getState());
  const body = { oldPassword, newPassword };
  axios
    .patch("/api/users/changePassword", body, config)
    .then((res) => {
      callBack(res.data, false);
    })
    .catch((err) => {
      callBack(err.response.data, true);
    });
};
