const Candidate = require("../models/Candidate");

const matchCandidates = async (req, res) => {
  try {
    const { requiredSkills, preferredSkills, minExperience } = req.body;

    if (!requiredSkills || requiredSkills.length === 0) {
      return res.status(400).json({
        message: "Required skills are needed",
      });
    }

    const candidates = await Candidate.find();

    const results = candidates.map((candidate) => {
      const candidateSkills = candidate.skills.map((skill) =>
        skill.toLowerCase()
      );

      const required = requiredSkills.map((skill) => skill.toLowerCase());
      const preferred = preferredSkills
        ? preferredSkills.map((skill) => skill.toLowerCase())
        : [];

      const matchedSkills = required.filter((skill) =>
        candidateSkills.includes(skill)
      );

      const missingSkills = required.filter(
        (skill) => !candidateSkills.includes(skill)
      );

      const matchedPreferredSkills = preferred.filter((skill) =>
        candidateSkills.includes(skill)
      );

      let score = (matchedSkills.length / required.length) * 70;

      if (candidate.experience >= minExperience) {
        score += 20;
      }

      score += matchedPreferredSkills.length * 5;

      if (score > 100) {
        score = 100;
      }

      let category = "";

      if (score >= 75) {
        category = "High Match";
      } else if (score >= 40) {
        category = "Medium Match";
      } else {
        category = "Low Match";
      }

      return {
        candidateName: candidate.name,
        email: candidate.email,
        matchedSkills,
        missingSkills,
        preferredSkillsMatched: matchedPreferredSkills,
        experience: candidate.experience,
        matchScore: Math.round(score),
        category,
      };
    });

    results.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      message: "Error matching candidates",
      error: error.message,
    });
  }
};

module.exports = { matchCandidates };