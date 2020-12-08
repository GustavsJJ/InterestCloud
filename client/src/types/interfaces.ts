import * as actions from "../store/actions/types";

export enum E_ERROR {
  LOGIN_FAIL = "LOGIN_FAIL",
  REGISTER_FAIL = "REGISTER_FAIL",
}

// export type actionType = actions[]forEach(num => {});

type actionKeys = keyof typeof actions;
export type actionType = typeof actions[actionKeys];

export interface IUser {
  id: string;
  name: string;
  email: string;
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
  __v: number;
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
