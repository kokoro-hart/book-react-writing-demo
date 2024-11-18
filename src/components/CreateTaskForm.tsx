import { Plus } from "lucide-react";
import { Task } from "../types/task";
import { useRef } from "react";

type Props = {
  onSubmit: (title: Task["title"]) => void;
};

export function CreateTaskForm({ onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) {
      return;
    }

    // input の値を取得
    const inputValue = inputRef.current?.value.trim();
    if (!inputValue) {
      return;
    }

    // タスクを作成
    onSubmit(inputValue);

    // 入力値をリセット
    inputRef.current.value = "";
  };

  return (
    <form className="flex gap-0.5" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="新しいタスクを入力してください"
        className="grow rounded-s border p-2"
      />
      <button
        type="submit"
        className="rounded-e bg-blue-600 p-2 transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        aria-label={"タスクを作成する"}
      >
        <Plus className="text-white" />
      </button>
    </form>
  );
}
