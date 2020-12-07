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

export interface IAction {
  type: string;
  payload?: any;
}

export interface IPost {
  _id: string;
  date: Date;
  title: string;
  description: string;
  __v: number;
}
