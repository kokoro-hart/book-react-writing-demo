import { useCallback, useEffect, useState } from "react";

import { Task } from "../types/task";

export const useTaskList = () => {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const taskListStorage = localStorage.getItem("taskList");
    return JSON.parse(taskListStorage ?? "[]");
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const handleCreate = useCallback((title: Task["title"]) => {
    setTaskList((prevTodoList) => {
      const newTask: Task = {
        id: Date.now(),
        title,
        completed: false,
      };
      return [...prevTodoList, newTask];
    });
  }, []);

  const handleUpdate = useCallback(
    (id: Task["id"], updatedTask: Partial<Task>) => {
      setTaskList((prevTaskList) => {
        return prevTaskList.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task,
        );
      });
    },
    [],
  );

  const handleDelete = useCallback((id: Task["id"]) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((todo) => todo.id !== id);
    });
  }, []);

  return {
    taskList,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
