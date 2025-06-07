import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ActorProfile = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY; // ✅ Import from .env

  useEffect(() => {
    const fetchActorDetails = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`);
      setActor(res.data);
    };

    const fetchActorMovies = async () => {
      const res = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}`);
      setMovies(res.data.cast);
    };

    fetchActorDetails();
    fetchActorMovies();
  }, [id, apiKey]);

  return (
    <div>
      {actor && (
        <div className="actor-card">
          <h2>{actor.name}</h2>
          <p>{actor.biography || 'No biography available.'}</p>
        </div>
      )}
      <h3>Movies</h3>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorProfile;
