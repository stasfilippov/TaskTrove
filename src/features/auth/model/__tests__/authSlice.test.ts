import { configureStore } from "@reduxjs/toolkit";
import { AppDispatch } from "app/store";
import { clearTasksAndTodolists } from "common/actions";
import { ResultCode } from "common/enums";
import { authAPI, securityAPI } from "features/auth/api/auth.api";
import { authSlice, authThunks } from "../authSlice";

// Mocks for APIs
jest.mock("common/actions", () => ({
  clearTasksAndTodolists: jest.fn(),
}));

jest.mock("features/auth/api/auth.api", () => ({
  authAPI: {
    login: jest.fn(),
    logout: jest.fn(),
    me: jest.fn(),
  },
  securityAPI: {
    getCaptcha: jest.fn(),
  },
}));

describe("authThunks", () => {
  let store: ReturnType<typeof configureStore>;
  let dispatch: AppDispatch;
  let getState: () => AppRootStateType;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice,
      },
    });
    dispatch = store.dispatch;
    getState = store.getState;
  });

  it("test_login_success", async () => {
    const loginParams = { email: "test@example.com", password: "password", rememberMe: false };
    (authAPI.login as jest.Mock).mockResolvedValue({
      data: { resultCode: ResultCode.Success },
    });

    await dispatch(authThunks.login(loginParams));

    expect(getState().auth.isLoggedIn).toBe(true);
  });

  it("test_logout_success", async () => {
    (authAPI.logout as jest.Mock).mockResolvedValue({
      data: { resultCode: ResultCode.Success },
    });

    await dispatch(authThunks.logout());

    expect(clearTasksAndTodolists).toHaveBeenCalled();
    expect(getState().auth.isLoggedIn).toBe(false);
  });

  it("test_get_captcha_url_success", async () => {
    const captchaUrl = "http://example.com/captcha";
    (securityAPI.getCaptcha as jest.Mock).mockResolvedValue({
      data: { url: captchaUrl },
    });

    await dispatch(authThunks.getCaptchaURL());

    expect(getState().auth.captchaURL).toBe(captchaUrl);
  });

  it("test_login_failure_incorrect_credentials", async () => {
    const loginParams = { email: "wrong@example.com", password: "wrong", rememberMe: false };
    (authAPI.login as jest.Mock).mockResolvedValue({
      data: { resultCode: ResultCode.Error },
    });

    await dispatch(authThunks.login(loginParams));

    expect(getState().auth.isLoggedIn).toBe(false);
  });

  it("test_login_failure_server_error", async () => {
    const loginParams = { email: "test@example.com", password: "password", rememberMe: true };
    (authAPI.login as jest.Mock).mockRejectedValue(new Error("Server error"));

    await dispatch(authThunks.login(loginParams));

    expect(getState().auth.isLoggedIn).toBe(false);
  });

  it("test_get_captcha_url_failure", async () => {
    (securityAPI.getCaptcha as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    await dispatch(authThunks.getCaptchaURL());

    expect(getState().auth.captchaURL).toBe(""); // Assuming initial state is empty
  });
});
