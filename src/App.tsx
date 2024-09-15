import { TaskItem } from "./components/TaskItem";
import { CreateTaskForm } from "./components/CreateTaskForm";

import { useTaskList } from "./hooks/useTaskList";

function App() {
  const {
    taskList,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleDeleteAllCompleted,
  } = useTaskList();

  return (
    <main className="mx-auto mt-10 max-w-xl space-y-10">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="space-y-5">
        <CreateTaskForm onSubmit={handleCreate} />
        <div className="space-y-5 rounded bg-slate-100 p-5">
          {taskList.length === 0 && (
            <p className="text-center text-sm">タスクがありません</p>
          )}
          {taskList.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onChangeCheckBox={handleUpdate}
              onChangeInput={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      {taskList.some((task) => task.completed) && (
        <div className="flex justify-end">
          <button
            onClick={handleDeleteAllCompleted}
            className="rounded-md p-2 text-sm text-red-500 transition-colors hover:bg-red-50"
          >
            完了済みのタスクをすべて削除
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
