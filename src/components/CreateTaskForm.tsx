import { memo, useState } from "react";
import { Plus } from "lucide-react";
import { Task } from "../types/task";

type Props = {
  onSubmit: (title: Task["title"]) => void;
};

export const CreateTaskForm = memo(({ onSubmit }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form className="flex gap-0.5" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="新しいタスクを入力してください"
        className="grow rounded-s border p-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-e bg-blue-600 p-2 transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={!inputValue.trim()}
        aria-label={`タスク「${inputValue}」を作成する`}
      >
        <Plus className="text-white" />
      </button>
    </form>
  );
});

CreateTaskForm.displayName = "CreateTaskForm";
