import { Task } from "../types/task";
import { useLocalStorageState } from "./useLocalStorageState";

export function useTasks() {
  const [taskList, setTaskList] = useLocalStorageState<Task[]>("taskList", []);

  const activeTaskList = taskList.filter(({ status }) => status !== "trashed");

  const trashedTaskList = taskList.filter(({ status }) => status === "trashed");

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

  const updateTask = (id: Task["id"], updatedTask: Partial<Task>) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      );
    });
  };

  const deleteTask = (id: Task["id"]) => {
    setTaskList((prevTaskList) => {
      return prevTaskList.filter((task) => task.id !== id);
    });
  };

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
}
