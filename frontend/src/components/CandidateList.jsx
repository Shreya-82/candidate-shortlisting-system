import API from "../api";

function CandidateList({ candidates, fetchCandidates }) {
  const deleteCandidate = async (id) => {
    try {
      await API.delete(`/candidates/${id}`);
      alert("Candidate deleted");
      fetchCandidates();
    } catch (error) {
      alert("Error deleting candidate");
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h2>Candidate List</h2>

      {candidates.length === 0 ? (
        <p>No candidates added yet.</p>
      ) : (
        <div className="candidate-grid">
          {candidates.map((candidate) => (
            <div className="candidate-card" key={candidate._id}>
              <h3>{candidate.name}</h3>
              <p>{candidate.email}</p>
              <p>
                <strong>Skills:</strong> {candidate.skills.join(", ")}
              </p>
              <p>
                <strong>Experience:</strong> {candidate.experience} years
              </p>
              <p>{candidate.bio}</p>

              <button
                className="delete-btn"
                onClick={() => deleteCandidate(candidate._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidateList;