import { useEffect, useState } from "react";
import API from "../api";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CandidateForm from "../components/CandidateForm";
import CandidateList from "../components/CandidateList";
import JobRequirementForm from "../components/JobRequirementForm";
import ShortlistedCandidates from "../components/ShortlistedCandidates";
import AIRecommendation from "../components/AIRecommendation";
import MatchScoreChart from "../components/MatchScoreChart";

function Home() {
  const [candidates, setCandidates] = useState([]);
  const [matchedCandidates, setMatchedCandidates] = useState([]);
  const [aiRecommendation, setAIRecommendation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCandidates = async () => {
    try {
      const response = await API.get("/candidates");
      setCandidates(response.data);
    } catch (error) {
      console.log("Error fetching candidates", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter((candidate) => {
    const search = searchTerm.toLowerCase();

    const nameMatch = candidate.name.toLowerCase().includes(search);

    const skillMatch = candidate.skills.some((skill) =>
      skill.toLowerCase().includes(search)
    );

    return nameMatch || skillMatch;
  });

  return (
    <div className="container">
      <Navbar />

      <h1>Candidate Profile Shortlisting System</h1>
      <p className="subtitle">
        AI-powered candidate filtering, ranking and recommendation system
      </p>

      <CandidateForm fetchCandidates={fetchCandidates} />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <CandidateList
        candidates={filteredCandidates}
        fetchCandidates={fetchCandidates}
      />

      <JobRequirementForm
        setMatchedCandidates={setMatchedCandidates}
        setAIRecommendation={setAIRecommendation}
      />

      <ShortlistedCandidates matchedCandidates={matchedCandidates} />

      <MatchScoreChart matchedCandidates={matchedCandidates} />

      <AIRecommendation recommendation={aiRecommendation} />
    </div>
  );
}

export default Home;