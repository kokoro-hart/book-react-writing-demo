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
  onChangeCheckBox: (id: Task["id"], args: Pick<Task, "completed">) => void;
  onChangeInput: (id: Task["id"], args: Pick<Task, "title">) => void;
  onDelete: (id: Task["id"]) => void;
};

export const TaskItem = memo(
  ({ task, onChangeCheckBox, onChangeInput, onDelete }: Props) => {
    return (
      <div className="flex items-center gap-3 rounded bg-white px-4 py-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="size-5 cursor-pointer"
            checked={task.completed}
            onChange={(e) =>
              onChangeCheckBox(task.id, {
                completed: e.target.checked,
              })
            }
          />
        </div>
        <input
          type="text"
          className={inputVariants({ completed: task.completed })}
          defaultValue={task.title}
          disabled={task.completed}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing || event.key !== "Enter") return;
            event.currentTarget.blur();
          }}
          onBlur={(e) =>
            onChangeInput(task.id, {
              title: e.target.value,
            })
          }
        />
        <button
          type="button"
          className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="size-5 text-gray-500" />
        </button>
      </div>
    );
  },
);

TaskItem.displayName = "TaskItem";
