function AIRecommendation({ recommendation }) {
  const cleanText = recommendation
    ?.replaceAll("###", "")
    .replaceAll("**", "");

  return (
    <div className="card">
      <h2>AI Recommendation</h2>

      {recommendation ? (
        <div className="ai-box">
          {cleanText.split("\n").map((line, index) =>
            line.trim() === "" ? <br key={index} /> : <p key={index}>{line}</p>
          )}
        </div>
      ) : (
        <p>No AI recommendation yet.</p>
      )}
    </div>
  );
}

export default AIRecommendation;