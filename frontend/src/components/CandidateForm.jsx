import { useState } from "react";
import API from "../api";

function CandidateForm({ fetchCandidates }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitCandidate = async (e) => {
    e.preventDefault();

    const candidateData = {
      name: formData.name,
      email: formData.email,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      experience: Number(formData.experience),
      bio: formData.bio,
    };

    try {
      await API.post("/candidates", candidateData);
      alert("Candidate added successfully");

      setFormData({
        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: "",
      });

      fetchCandidates();
    } catch (error) {
      alert("Error adding candidate");
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>Add Candidate</h2>

      <form onSubmit={submitCandidate}>
        <input
          type="text"
          name="name"
          placeholder="Candidate Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Candidate Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills: React, Node.js, MongoDB"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience in years"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <textarea
          name="bio"
          placeholder="Projects / Bio"
          value={formData.bio}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
}

export default CandidateForm;