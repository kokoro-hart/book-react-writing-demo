export type Task = {
  id: number;
  title: string;
  status: "notStarted" | "completed" | "trashed";
};
