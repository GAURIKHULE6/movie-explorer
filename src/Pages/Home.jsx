import React, { useEffect, useState } from 'react';
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import LanguageSelector from "../components/LanguageSelector";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US'); // <-- default language
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // Fetch genres according to selected language
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${selectedLanguage}`)
      .then(res => res.json())
      .then(data => setGenres(data.genres || []))
      .catch(err => console.error('Failed to fetch genres:', err));
  }, [selectedLanguage]);

  // Fetch movies (popular or search) in the selected language
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const endpoint = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=${selectedLanguage}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${selectedLanguage}&page=${page}`;

      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, page, selectedLanguage]); // <-- re-fetch when language changes

  const filteredMovies = movies.filter(movie =>
    selectedGenre ? movie.genre_ids.includes(Number(selectedGenre)) : true
  );

  return (
    <div style={{ maxWidth: 1000, margin: 'auto', padding: 20 }}>
      <h1>🎬 Movie Explorer</h1>

      {/* Language selector */}
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      {loading ? (
        <p>Loading movies...</p>
      ) : filteredMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 30,
            marginTop: 20
          }}
        >
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            opacity: page === 1 ? 0.6 : 1
          }}
        >
          ⬅️ Previous
        </button>

        <span style={{ alignSelf: 'center' }}>Page {page}</span>

        <button
          onClick={() => setPage(prev => prev + 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Home;
