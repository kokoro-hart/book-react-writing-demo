import { Trash2 } from "lucide-react";
import { Task } from "../types/task";
import { cva } from "class-variance-authority";
import { memo } from "react";

const inputVariants = cva("flex-1 border px-2 py-1", {
  variants: {
    completed: {
      true: "text-gray-400 line-through disabled:cursor-not-allowed",
    },
  },
});

type Props = {
  task: Task;
  onChange: (id: Task["id"], args: Partial<Task>) => void;
};

export const TaskItem = memo(({ task, onChange }: Props) => {
  return (
    <div className="flex items-center gap-3 rounded bg-white px-4 py-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="size-5 cursor-pointer"
          checked={task.status === "completed"}
          onChange={(e) =>
            onChange(task.id, {
              status: e.target.checked ? "completed" : "notStarted",
            })
          }
        />
      </div>
      <input
        type="text"
        className={inputVariants({ completed: task.status === "completed" })}
        defaultValue={task.title}
        disabled={task.status === "completed"}
        onKeyDown={(event) => {
          if (event.nativeEvent.isComposing || event.key !== "Enter") return;
          event.currentTarget.blur();
        }}
        onBlur={(e) =>
          onChange(task.id, {
            title: e.target.value,
          })
        }
      />
      <button
        type="button"
        className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
        onClick={() =>
          onChange(task.id, {
            status: "trashed",
          })
        }
        aria-label={`タスク「${task.title}」をゴミ箱へ移動する`}
      >
        <Trash2 className="size-5 text-gray-500" />
      </button>
    </div>
  );
});

TaskItem.displayName = "TaskItem";
