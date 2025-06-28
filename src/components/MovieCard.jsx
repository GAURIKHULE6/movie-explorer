import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if this movie is in favorites on mount or when movie ID changes
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === movie.id));
  }, [movie.id]);

  // Toggle favorite: add or remove from localStorage
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updated = favorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
    } else {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  // Use TMDB image if available, else show fallback
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div
      className="movie-card"
      style={{
        padding: 10,
        border: "1px solid #eee",
        borderRadius: 10,
      }}
    >
      <Link to={`/movie/${movie.id}`}>
        <img
          src={posterUrl}
          alt={movie.title}
          style={{
            width: "100%",
            borderRadius: 8,
            marginBottom: 10,
          }}
        />
        <h4>{movie.title}</h4>
        <p>Rating: {movie.vote_average}</p>
      </Link>

      <button onClick={toggleFavorite} className="fav-btn">
        {isFavorite ? "❤️ Remove Favorite" : "🤍 Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieCard;
