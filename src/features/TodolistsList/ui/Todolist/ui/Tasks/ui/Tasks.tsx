import React from "react";
import { Task } from "./Task/Task";
import { TaskType } from "../../../../../api/tasks.api.types";
import { TodolistDomainType } from "../../../../../model/todolist/todolistsSlice";
import { TaskStatuses } from "../../../../../../../common/enums";

type Props = {
  tasks: TaskType[];
  todolist: TodolistDomainType;
};
export const Tasks = ({ tasks, todolist }: Props) => {
  const { id } = todolist;

  let tasksForTodolist = tasks;

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <div>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={id} />
      ))}
    </div>
  );
};
