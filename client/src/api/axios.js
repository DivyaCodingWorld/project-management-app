import axios from "axios";

const API = axios.create({
  baseURL: "https://project-management-app-186g.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;