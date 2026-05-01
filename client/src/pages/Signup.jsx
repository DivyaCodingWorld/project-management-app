import { useState } from "react";
import API from "../api/axios";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", data);
      alert("Signup Successful");
      window.location.href = "/";
    } catch {
      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition"
        >
          Signup
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="text-purple-500 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}