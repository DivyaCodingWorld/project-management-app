const router = require("express").Router();
const { createProject, getProjects } = require("../controllers/projectController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Admin only
router.post("/", auth, role("Admin"), createProject);

// All users
router.get("/", auth, getProjects);

module.exports = router;