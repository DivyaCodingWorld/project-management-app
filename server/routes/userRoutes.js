const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// Get all users
router.get("/", auth, async (req, res) => {
  const users = await User.find().select("name email");
  res.json(users);
});

module.exports = router;