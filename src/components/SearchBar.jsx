const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ padding: 8, width: '100%', marginTop: 10 }}
    />
  );
};

export default SearchBar; // ✅ make sure this line is present
