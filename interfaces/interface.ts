import { Request } from "express";

export interface IUser {
  name: string;
  password: string;
  email: string;
  _id: string;
}

export interface IBlog {
  title: string;
  description: string;
  user: {};
}

export interface IGetUserAuthInfoRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}
