import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MatchScoreChart({ matchedCandidates }) {
  const data = matchedCandidates.map((candidate) => ({
    name: candidate.candidateName,
    score: candidate.matchScore,
  }));

  return (
    <div className="card">
      <h2>Match Score Chart</h2>

      {data.length === 0 ? (
        <p>No chart data yet.</p>
      ) : (
        <ResponsiveContainer width="95%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MatchScoreChart;