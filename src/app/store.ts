import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "features/TodolistsList/model/tasks/tasksSlice";
import { todolistsSlice } from "features/TodolistsList/model/todolist/todolistsSlice";
import { appSlice } from "app/appSlice";
import { authSlice } from "features/auth/model/authSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    auth: authSlice
  }
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
