import React from "react";

const GenreFilter = ({ genres, selectedGenre, setSelectedGenre }) => {
  return (
    <select
      value={selectedGenre}
      onChange={(e) => setSelectedGenre(e.target.value)}
      style={{ padding: 8, marginBottom: "1rem", width: "100%" }}
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  );
};

export default GenreFilter; // ✅ required if you use default import
