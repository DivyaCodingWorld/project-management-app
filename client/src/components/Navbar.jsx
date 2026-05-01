import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🚀 Project Manager
        </h1>

        <a
          href="/dashboard"
          className="hover:text-gray-200 transition"
        >
          Dashboard
        </a>

        <a
          href="/create-task"
          className="hover:text-gray-200 transition"
        >
          Create Task
        </a>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        <span className="text-sm bg-indigo-500 px-3 py-1 rounded-lg">
          {user?.email} ({user?.role})
        </span>

        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}