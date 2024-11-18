import { Task } from "../types/task";
import { useLocalStorageState } from "./useLocalStorageState";

export const useTasks = () => {
  // タスク一覧の状態を管理
  const [taskList, setTaskList] = useLocalStorageState<Task[]>("taskList", []);

  // ゴミ箱のタスクを除いたタスク一覧
  const activeTaskList = taskList.filter(({ status }) => status !== "trashed");

  // ゴミ箱のタスク一覧
  const trashedTaskList = taskList.filter(({ status }) => status === "trashed");

  // タスクを作成する
  const createTask = (title: Task["title"]) => {
    setTaskList((prevTaskList) => {
      const newTask: Task = {
        id: Date.now(),
        title,
        status: "notStarted",
      };
      return [...prevTaskList, newTask];
    });
  };

  // タスクを更新する
  const updateTask = (id: Task["id"], updatedTask: Partial<Task>) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      );
    });
  };

  // タスクを削除する
  const deleteTask = (id: Task["id"]) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => task.id !== id);
    });
  };

  // ゴミ箱のタスクを全て削除する
  const deleteAllTrashedTasks = () => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => task.status !== "trashed");
    });
  };

  return {
    activeTaskList,
    trashedTaskList,
    createTask,
    updateTask,
    deleteTask,
    deleteAllTrashedTasks,
  };
};
