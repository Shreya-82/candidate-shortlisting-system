function ShortlistedCandidates({ matchedCandidates }) {
  return (
    <div className="card">
      <h2>Shortlisted Candidates</h2>

      {matchedCandidates.length === 0 ? (
        <p>No results yet.</p>
      ) : (
        <div className="candidate-grid">
          {matchedCandidates.map((candidate, index) => (
            <div className="candidate-card" key={index}>
              <h3>{candidate.candidateName}</h3>

              <p>
                <strong>Email:</strong> {candidate.email}
              </p>

              <p>
                <strong>Match Score:</strong> {candidate.matchScore}%
              </p>

              <p>
                <strong>Matched Skills:</strong>{" "}
                {candidate.matchedSkills.join(", ")}
              </p>

              <p>
                <strong>Missing Skills:</strong>{" "}
                {candidate.missingSkills.join(", ")}
              </p>

              <p>
                <strong>Experience:</strong> {candidate.experience} years
              </p>

              <span
                className={
                  candidate.category === "High Match"
                    ? "high"
                    : candidate.category === "Medium Match"
                    ? "medium"
                    : "low"
                }
              >
                {candidate.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShortlistedCandidates;