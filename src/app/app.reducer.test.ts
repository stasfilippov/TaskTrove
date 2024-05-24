import { appActions, AppInitialStateType, appSlice } from "app/appSlice";
import { authThunks } from "features/auth/model/authSlice";
import { tasksThunks } from "features/TodolistsList/model/tasks/tasksSlice";
import { todolistsThunks } from "features/TodolistsList/model/todolist/todolistsSlice";

let startState: AppInitialStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: "idle",
    isInitialized: false,
  };
});

test("correct error message should be set", () => {
  const endState = appSlice(startState, appActions.setAppError({ error: "some error" }));
  expect(endState.error).toBe("some error");
});

// test("test_state_loading_on_pending_action", () => {
//   const action = { type: "app/somePendingAction" };

//   const newState = appSlice(startState, action);
//   expect(newState.status).toEqual("loading");
// });
test("test_reducer_ignores_specific_rejections", () => {
  const rejectedActions = [
    { type: todolistsThunks.addTodolist.rejected.type, payload: { messages: ["Error"] } },
    { type: tasksThunks.addTask.rejected.type, payload: { messages: ["Error"] } },
    { type: authThunks.initializeApp.rejected.type, payload: { messages: ["Error"] } },
  ];
  rejectedActions.forEach((action) => {
    const state = appSlice(startState, action);
    expect(state.error).toBeNull();
  });
});
