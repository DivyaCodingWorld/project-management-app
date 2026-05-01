import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Fetch tasks error:", err.response?.data || err.message);
      alert("Tasks load nahi ho rahe");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title.trim()) {
      alert("Task title likho");
      return;
    }

    try {
      await API.post("/tasks", {
        title,
        status: "Pending",
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log("Create task error:", err.response?.data || err.message);
      alert("Task create nahi hua");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.log("Update error:", err.response?.data || err.message);
      alert("Status update nahi hua");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log("Delete error:", err.response?.data || err.message);
      alert("Task delete nahi hua");
    }
  };

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status !== "Completed").length;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="text-gray-500">Total Tasks</p>
            <h3 className="text-3xl font-bold">{total}</h3>
          </div>

          <div className="bg-yellow-100 p-5 rounded-xl shadow">
            <p>Pending</p>
            <h3 className="text-3xl font-bold">{pending}</h3>
          </div>

          <div className="bg-green-100 p-5 rounded-xl shadow">
            <p>Completed</p>
            <h3 className="text-3xl font-bold">{completed}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">Create Task</h3>

          <div className="flex gap-3">
            <input
              className="flex-1 border p-3 rounded-lg"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button
              onClick={createTask}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Tasks</h3>

          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks found</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex flex-col md:flex-row md:items-center justify-between border-b py-4 gap-3"
              >
                <div>
                  <h4 className="font-semibold text-lg">{task.title}</h4>

                  <span
                    className={`inline-block mt-2 text-xs px-3 py-1 rounded ${
                      task.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : task.status === "In Progress"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {task.status || "Pending"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <select
                    value={task.status || "Pending"}
                    onChange={(e) => updateStatus(task._id, e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}