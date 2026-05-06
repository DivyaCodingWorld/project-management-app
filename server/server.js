// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");

// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));
// app.use("/api/tasks", require("./routes/taskRoutes"));

// app.get("/", (req, res) => {
//   res.send("🚀 API is running...");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on ${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://project-management-app-rouge-nine.vercel.app"],
  credentials: true
}));
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));