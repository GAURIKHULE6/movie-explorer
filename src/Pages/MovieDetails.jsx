import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// const API_KEY = 'f63eb621a9c8c826e237bf0debcfbb3b';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieDetails() {
      setLoading(true);
      try {
        // Fetch movie basic details
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovie(data);

        // Fetch credits (for cast)
        const creditsRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast.slice(0, 5)); // top 5 cast members

        // Fetch videos (for trailer)
        const videosRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const videosData = await videosRes.json();
        // Find the first YouTube trailer
        const trailer = videosData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading movie details...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>{movie.title}</h2>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
        alt={movie.title}
        style={{ borderRadius: 8, marginBottom: 20 }}
      />
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>

      <h3>Cast</h3>
<ul>
  {cast.map(actor => (
    <li key={actor.cast_id}>
      <Link to={`/actor/${actor.id}`}>{actor.name}</Link> as {actor.character}
    </li>
  ))}
</ul>

      {trailerKey && (
        <div style={{ marginTop: 20 }}>
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>

    
  );
};

export default MovieDetails;
