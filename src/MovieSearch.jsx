import React, { useState } from 'react';
import axios from 'axios';

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSelectedMovie(null); // Clear detailed view on new search

    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=YOUR_OMDB_API_KEY`
      );

      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError('No results found.');
      }
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = async (imdbID) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=[aas6shbdv2vhdhu8s]&i=${imdbID}`
      );
      setSelectedMovie(response.data);
    } catch (err) {
      setError('Failed to fetch movie details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {movies.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {movies.map((movie) => (
            <div key={movie.imdbID} onClick={() => handleMovieClick(movie.imdbID)} style={{ cursor: 'pointer' }}>
              <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: '100%' }} />
              <p>{movie.Title} ({movie.Year})</p>
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <div>
          <h2>{selectedMovie.Title}</h2>
          <img src={selectedMovie.Poster} alt={selectedMovie.Title} style={{ maxWidth: '300px' }} />
          <p>Year: {selectedMovie.Year}</p>
          <p>Plot: {selectedMovie.Plot}</p>
          <p>Actors: {selectedMovie.Actors}</p>
          <p>Director: {selectedMovie.Director}</p>
          <p>Rating: {selectedMovie.imdbRating}</p>
        </div>
      )}
    </div>
  );
}

export default MovieSearch;