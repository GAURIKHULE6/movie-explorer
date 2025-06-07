import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = 'f63eb621a9c8c826e237bf0debcfbb3b';

const ActorDetails = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActorDetails() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setActor(data);

        const creditsRes = await fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`);
        const creditsData = await creditsRes.json();
        setMovies(creditsData.cast.slice(0, 10)); // top 10 movies
      } catch (error) {
        console.error('Error fetching actor details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchActorDetails();
  }, [id]);

  if (loading) return <p>Loading actor details...</p>;
  if (!actor) return <p>Actor not found.</p>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h2>{actor.name}</h2>
      <img
        src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
        alt={actor.name}
        style={{ borderRadius: 8, marginBottom: 20 }}
      />
      <p><strong>Biography:</strong> {actor.biography || 'No biography available.'}</p>
      <p><strong>Born:</strong> {actor.birthday || 'N/A'}</p>
      <p><strong>Place of Birth:</strong> {actor.place_of_birth || 'N/A'}</p>

      <h3>Known For Movies</h3>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link> ({movie.release_date ? movie.release_date.slice(0,4) : 'N/A'})
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        <Link to="/">← Back to Home</Link>
      </div>
    </div>
  );
};

export default ActorDetails;
