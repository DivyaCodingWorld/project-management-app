import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function CreateTask() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    loadProjects();
    loadUsers();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
      alert("Projects load nahi ho rahe");
    }
  };

  const loadUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      alert("Users load nahi ho rahe");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (!form.title || !form.project || !form.assignedTo) {
      alert("Title, Project aur Assign User required hai");
      return;
    }

    try {
      await API.post("/tasks", form);
      alert("Task created successfully ✅");

      setForm({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        dueDate: "",
        status: "Pending",
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Task create nahi hua ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Create New Task
          </h2>

          <form onSubmit={createTask} className="space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Task Description"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="3"
            />

            <select
              name="project"
              value={form.project}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>

            <select
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Assign User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} - {user.email}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Create Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
}