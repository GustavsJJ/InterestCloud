import * as actions from "../store/actions/types";

export enum E_ERROR {
  LOGIN_FAIL = "LOGIN_FAIL",
  REGISTER_FAIL = "REGISTER_FAIL",
}

export interface IError {
  msg: string;
  status: number;
  id: any;
}

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
  categoryIds: string[];
  imageId: string;
  author: string;
  liked?: boolean;
}

export interface ICategory {
  _id: string;
  name: string;
  color: string;
  points?: number;
}

export interface IImage {
  _id: string;
  length: number;
  chunkSize: number;
  uploadDate: Date;
}

// Store/Actions/Reducers

type actionKeys = keyof typeof actions;
export type actionType = typeof actions[actionKeys];

export interface IAction {
  type: actionType;
  payload?: any;
}
