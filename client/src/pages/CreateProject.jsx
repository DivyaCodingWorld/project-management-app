import { useState } from "react";
import API from "../api/axios";

export default function CreateProject() {
  const [name, setName] = useState("");

  const createProject = async () => {
    try {
      await API.post("/projects", { name });
      alert("Project created ✅");
    } catch {
      alert("Only Admin can create project ❌");
    }
  };

  return (
    <div>
      <h2>Create Project</h2>

      <input
        placeholder="Project name"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createProject}>Create</button>
    </div>
  );
}