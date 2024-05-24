import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions";
import { ResultCode } from "common/enums";
import { createAppAsyncThunk } from "common/utils";
import { authAPI, LoginParamsType, securityAPI } from "features/auth/api/auth.api";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const res = await authAPI.login(arg);
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(res.data);
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.logout();
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTasksAndTodolists());
    return { isLoggedIn: false };
  } else {
    return rejectWithValue(res.data);
  }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  const res = await authAPI.me();
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(res.data);
  }
});

const getCaptchaURL = createAppAsyncThunk<{ captchaURL: string }>("app/getCaptchaURL", async () => {
  const res = await securityAPI.getCaptcha();
  return { captchaURL: res.data.url };
});

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    captchaURL: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.getCaptchaURL.fulfilled, (state, action) => {
        state.captchaURL = action.payload.captchaURL;
      })

      .addMatcher(
        isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
        (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        },
      );
  },
});

export const authSlice = slice.reducer;
export const authThunks = { login, logout, initializeApp, getCaptchaURL };
