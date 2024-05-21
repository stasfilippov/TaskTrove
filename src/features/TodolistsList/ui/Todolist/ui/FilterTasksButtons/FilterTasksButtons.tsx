import React from "react";
import { Button } from "@mui/material";
import { useActions } from "common/hooks";
import { FilterValuesType, TodolistDomainType, todolistsActions } from "../../../../model/todolist/todolistsSlice";

type Props = {
  todolist: TodolistDomainType;
};
export const FilterTasksButtons = ({ todolist }: Props) => {
  const { changeTodolistFilter } = useActions(todolistsActions);

  const { id, filter } = todolist;
  const changeFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ filter, id });
  };

  return (
    <>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("all")}
        color={"inherit"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("active")}
        color={"primary"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={() => changeFilterHandler("completed")}
        color={"secondary"}
      >
        Completed
      </Button>
    </>
  );
};
