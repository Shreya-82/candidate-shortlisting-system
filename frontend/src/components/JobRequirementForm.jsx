import { useState } from "react";
import API from "../api";

function JobRequirementForm({ setMatchedCandidates, setAIRecommendation }) {
  const [jobData, setJobData] = useState({
    requiredSkills: "",
    preferredSkills: "",
    minExperience: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!jobData.requiredSkills.trim() || !jobData.minExperience) {
      alert("Please fill required skills and minimum experience");
      return false;
    }
    return true;
  };

  const formatJobData = () => {
    return {
      requiredSkills: jobData.requiredSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),

      preferredSkills: jobData.preferredSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),

      minExperience: Number(jobData.minExperience),
    };
  };

  const basicShortlist = async () => {
    if (!validateForm()) return;

    try {
      const response = await API.post("/match", formatJobData());
      setMatchedCandidates(response.data);
    } catch (error) {
      alert("Error matching candidates");
      console.log(error);
    }
  };

  const aiShortlist = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await API.post("/ai/shortlist", formatJobData());
      setAIRecommendation(response.data.recommendation);
    } catch (error) {
      alert("AI shortlisting failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Job Requirements</h2>

      <input
        type="text"
        name="requiredSkills"
        placeholder="Required Skills: React, Node.js"
        value={jobData.requiredSkills}
        onChange={handleChange}
      />

      <input
        type="text"
        name="preferredSkills"
        placeholder="Preferred Skills: MongoDB, AWS"
        value={jobData.preferredSkills}
        onChange={handleChange}
      />

      <input
        type="number"
        name="minExperience"
        placeholder="Minimum Experience"
        value={jobData.minExperience}
        onChange={handleChange}
      />

      <div className="btn-group">
        <button onClick={basicShortlist}>Basic Shortlisting</button>
        <button onClick={aiShortlist}>AI Shortlisting</button>
      </div>

      {loading && <p className="loading">AI is generating recommendation...</p>}
    </div>
  );
}

export default JobRequirementForm;