const axios = require("axios");
const Candidate = require("../models/Candidate");

const aiShortlistCandidates = async (req, res) => {
  try {
    const { requiredSkills, preferredSkills = [], minExperience } = req.body;

    const candidates = await Candidate.find();

    if (candidates.length === 0) {
      return res.status(404).json({
        message: "No candidates found",
      });
    }

    const candidateText = candidates
      .map(
        (candidate, index) => `
${index + 1}. Name: ${candidate.name}
Email: ${candidate.email}
Skills: ${candidate.skills.join(", ")}
Experience: ${candidate.experience} years
Bio: ${candidate.bio}
`
      )
      .join("\n");

    const prompt = `
You are an expert HR recruiter.

Rank the following candidates for the given job role.

Job Requirements:
Required Skills: ${requiredSkills.join(", ")}
Preferred Skills: ${preferredSkills.join(", ")}
Minimum Experience: ${minExperience} years

Candidates:
${candidateText}

For each candidate, provide:
1. Rank
2. Match percentage
3. Strengths
4. Weaknesses
5. Reason for selection or rejection
6. Final recommendation
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      recommendation: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.log("AI ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: "AI shortlisting failed",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { aiShortlistCandidates };