function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="card">
      <h2>Search Candidates</h2>

      <input
        type="text"
        placeholder="Search by name or skill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;