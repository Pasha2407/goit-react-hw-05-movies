import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../components/api';

export const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
        console.log(data);
      } catch (error) {
      } finally {
      }
    };
    fetchMovies();
  }, []);

  return (
    <ul>
      Trending movies today
      {trendingMovies.map(item => {
        return <li key={item.id}> {item.title}</li>;
      })}
    </ul>
  );
};
