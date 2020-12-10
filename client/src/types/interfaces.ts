import * as actions from "../store/actions/types";

export enum E_ERROR {
  LOGIN_FAIL = "LOGIN_FAIL",
  REGISTER_FAIL = "REGISTER_FAIL",
}

type actionKeys = keyof typeof actions;
export type actionType = typeof actions[actionKeys];

export interface IUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
}

export interface IAuth {
  token: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser;
}

export interface IPost {
  _id: string;
  date: Date;
  title: string;
  description: string;
}

export interface ICategory {
  _id: string;
  name: string;
  color: string;
  position?: number;
}

export interface IAction {
  type: actionType;
  payload?: any;
}
