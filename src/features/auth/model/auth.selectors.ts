import { AppRootStateType } from "app/store";
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;

export const selectCaptcha = (state: AppRootStateType) => state.auth.captchaURL;
