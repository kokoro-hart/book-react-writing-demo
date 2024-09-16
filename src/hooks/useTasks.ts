import { useCallback, useEffect, useMemo, useState } from "react";

import { Task } from "../types/task";

export const useTasks = () => {
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const taskListStorage = localStorage.getItem("taskList");
    return JSON.parse(taskListStorage ?? "[]");
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const activeTaskList = useMemo(() => {
    return taskList.filter(({ status }) => status !== "trashed");
  }, [taskList]);

  const trashedTaskList = useMemo(() => {
    return taskList.filter(({ status }) => status === "trashed");
  }, [taskList]);

  // タスクを作成する
  const handleCreate = useCallback((title: Task["title"]) => {
    setTaskList((prevTodoList) => {
      const newTask: Task = {
        id: Date.now(),
        title,
        status: "notStarted",
      };
      return [...prevTodoList, newTask];
    });
  }, []);

  // タスクを更新する
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

  // タスクを削除する
  const handleDelete = useCallback((id: Task["id"]) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => task.id !== id);
    });
  }, []);

  // 完了済みタスクを全てにゴミ箱に変更する
  const handleTrashedAllCompleted = useCallback(() => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) =>
        task.status === "completed" ? { ...task, status: "trashed" } : task,
      );
    });
  }, []);

  // ゴミ箱のタスクを全て削除する
  const handleDeleteAllTrashed = useCallback(() => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => task.status !== "trashed");
    });
  }, []);

  return {
    activeTaskList,
    trashedTaskList,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleTrashedAllCompleted,
    handleDeleteAllTrashed,
  };
};
