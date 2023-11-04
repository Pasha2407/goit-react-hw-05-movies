import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from 'components/api';
import { MovieList } from 'components/MovieList/MovieList';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foundMovies, setFoundMovies] = useState([]);
  const movieName = searchParams.get('query') || '';

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = form.elements.search.value.toLowerCase();
    if (query.trim() === '') return alert('Can not be empty');
    setSearchParams({ query });
    event.target.reset();
  };

  useEffect(() => {
    const search = async () => {
      try {
        const movies = await searchMovies(movieName);
        setFoundMovies(movies);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
    search();
  }, [movieName]);

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ margin: 0 }}>Movie Search</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="type here" name="search" />
        <button type="submit">Search</button>
      </form>
      {foundMovies.length === 0 ? (
        <p>please search</p>
      ) : (
        <MovieList movies={foundMovies} />
      )}
      {foundMovies.length === 0 && movieName && (
        <h2>No movie found for the request "{movieName}"</h2>
      )}
    </div>
  );
};

export default Movies;
