const Candidate = require("../models/Candidate");

// Add candidate
const addCandidate = async (req, res) => {
  try {
    const { name, email, skills, experience, bio } = req.body;

    if (!name || !email || !skills || !experience || !bio) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const candidate = await Candidate.create({
      name,
      email,
      skills,
      experience,
      bio,
    });

    res.status(201).json({
      message: "Candidate added successfully",
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding candidate",
      error: error.message,
    });
  }
};

// Get all candidates
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });

    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching candidates",
      error: error.message,
    });
  }
};

// Update candidate
const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      message: "Candidate updated successfully",
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating candidate",
      error: error.message,
    });
  }
};

// Delete candidate
const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.status(200).json({
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting candidate",
      error: error.message,
    });
  }
};

module.exports = {
  addCandidate,
  getCandidates,
  updateCandidate,
  deleteCandidate,
};