const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
};

// GET TASKS (by project optional)
exports.getTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.project) {
      filter.project = req.query.project;
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name")
      .populate("project", "name");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
};

// UPDATE TASK STATUS
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error updating task" });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting task" });
  }
};