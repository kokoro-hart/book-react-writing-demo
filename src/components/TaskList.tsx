import { Trash2 } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import { CreateTaskForm } from "./CreateTaskForm";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const { activeTaskList, createTask, updateTask, trashedAllCompletedTasks } =
    useTasks();

  return (
    <div className="relative">
      <div className="sticky top-0 flex flex-col items-end gap-2 bg-slate-100 px-10 py-5">
        <button
          onClick={trashedAllCompletedTasks}
          className="flex items-center gap-1 rounded-md p-2 text-sm text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed"
          disabled={
            !activeTaskList.some(({ status }) => status === "completed")
          }
        >
          <Trash2 className="size-4" />
          完了済みのタスクをすべてゴミ箱へ移動
        </button>
        <div className="w-full">
          <CreateTaskForm onSubmit={createTask} />
        </div>
      </div>
      <div className="space-y-3 px-10 pb-10">
        {activeTaskList.length === 0 && (
          <p className="text-center text-sm">タスクがありません</p>
        )}
        {activeTaskList.map((task) => (
          <TaskItem key={task.id} task={task} onChange={updateTask} />
        ))}
      </div>
    </div>
  );
};
