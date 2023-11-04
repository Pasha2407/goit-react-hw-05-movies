import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../components/api';
import { MovieList } from 'components/MovieList/MovieList';

export const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ margin: 0 }}>Trending movies today</h2>
      <MovieList movies={trendingMovies} />
    </div>
  );
};
