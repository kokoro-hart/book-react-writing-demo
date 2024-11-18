import { Trash2 } from "lucide-react";
import { Task } from "../types/task";
import { cva } from "class-variance-authority";

// 入力フィールドのスタイルを定義
const inputVariants = cva("flex-1 border px-2 py-1", {
  variants: {
    completed: {
      true: "text-gray-400 line-through disabled:cursor-not-allowed", // 完了したタスクのスタイル
    },
  },
});

type Props = {
  task: Task;
  onChange: (id: Task["id"], args: Partial<Task>) => void; // 親コンポーネントからタスクの更新を受け取る関数
};

export function TaskItem({ task, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 rounded bg-white px-4 py-2">
      <div className="flex items-center">
        {/* タスクのステータス変更用のチェックボックス */}
        <input
          type="checkbox"
          className="size-5 cursor-pointer"
          checked={task.status === "completed"} // 完了状態に応じてチェックを反映
          onChange={(e) =>
            onChange(task.id, {
              // チェック状態に基づいてタスクのステータスを更新
              status: e.target.checked ? "completed" : "notStarted",
            })
          }
        />
      </div>
      {/* タスクのタイトルを編集可能な入力フィールド */}
      <input
        type="text"
        className={inputVariants({ completed: task.status === "completed" })} // タスクが完了している場合のスタイルを適用
        defaultValue={task.title} // タスクの現在のタイトルを表示
        disabled={task.status === "completed"} // 完了したタスクの場合、編集を無効化
        onKeyDown={(event) => {
          // Enterキーで編集を確定し、入力フィールドからフォーカスを外す
          if (event.nativeEvent.isComposing || event.key !== "Enter") {
            return;
          }
          event.currentTarget.blur();
        }}
        onBlur={(e) => {
          onChange(task.id, {
            // フォーカスが外れたタイミングでタスクのタイトルを更新
            title: e.target.value,
          });
        }}
      />
      {/* タスクをゴミ箱に移動するボタン */}
      <button
        type="button"
        className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
        onClick={() =>
          onChange(task.id, {
            status: "trashed", // ステータスをゴミ箱に変更
          })
        }
        aria-label={`タスク「${task.title}」をゴミ箱へ移動する`}
      >
        <Trash2 className="size-5 text-gray-500" />
      </button>
    </div>
  );
}
