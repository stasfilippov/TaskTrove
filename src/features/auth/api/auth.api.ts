import axios from "axios";
import { instance } from "common/api/common.api";
import { BaseResponseType } from "common/types/common.types";

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId?: number }>>("auth/login", data);
  },
  logout() {
    return instance.delete<BaseResponseType<{ userId?: number }>>("auth/login");
  },
  me() {
    return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me");
  },
};

export const securityAPI = {
  getCaptcha() {
    return axios.get<getCaptchaResponse>("https://social-network.samuraijs.com/api/1.0/security/get-captcha-url");
  },
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export type getCaptchaResponse = {
  url: string;
};
