const Project = require("../models/Project");

// CREATE PROJECT (Admin only)
exports.createProject = async (req, res) => {
  try {
    const { name, description, members } = req.body;

    const project = await Project.create({
      name,
      description,
      members,
      createdBy: req.user._id,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Error creating project" });
  }
};

// GET ALL PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user._id },
        { members: req.user._id },
      ],
    }).populate("members", "name email");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching projects" });
  }
};