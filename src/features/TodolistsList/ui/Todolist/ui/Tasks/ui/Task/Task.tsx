import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "common/components";
import { TaskStatuses } from "common/enums";
import React, { ChangeEvent } from "react";
import { useActions } from "../../../../../../../../common/hooks";
import { TaskType } from "../../../../../../api/tasks.api.types";
import { tasksThunks } from "../../../../../../model/tasks/tasksSlice";
import s from "./task.module.css";

type Props = {
  task: TaskType;
  todolistId: string;
};

export const Task = ({ task, todolistId }: Props) => {
  const { removeTask, updateTask } = useActions(tasksThunks);

  const removeTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId });
  };
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
    updateTask({
      taskId: task.id,
      domainModel: { status: status },
      todolistId
    });
  };

  const changeTaskTitleHandler = (title: string) => {
    updateTask({ taskId: task.id, domainModel: { title }, todolistId });
  };

  let isTaskCompleted = task.status === TaskStatuses.Completed;

  return (
    <div key={task.id} className={isTaskCompleted ? s.isDone : ""}>
      <Checkbox checked={isTaskCompleted} color="primary" onChange={changeTaskStatusHandler} />
      <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  );
};
