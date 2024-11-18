import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { TaskList } from "./components/TaskList";
import { TrashedTaskList } from "./components/TrashedTaskList";

const router = createBrowserRouter([
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        // タスク一覧画面
        path: "/",
        element: <TaskList />,
      },
      {
        // ゴミ箱画面
        path: "/trash",
        element: <TrashedTaskList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
