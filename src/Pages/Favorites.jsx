import React, { useEffect, useState } from 'react';
import MovieCard from "../components/MovieCard";
import axios from 'axios';
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  return (
    <div>
      <h2>Your Favorites</h2>
      <div className="movie-grid">
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default Favorites;
