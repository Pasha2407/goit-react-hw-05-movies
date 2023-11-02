import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../components/api';
import { MovieList } from '../components/MovieList/MovieList';

export const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
      } finally {
      }
    };
    fetchMovies();
  }, []);

  return <MovieList movies={trendingMovies} />;
};
