import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from './api';

export const Cast = () => {
  const [cast, setCast] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const movieCast = async () => {
      try {
        const response = await fetchMovieCast(id);
        setCast(response);
      } catch (error) {
        console.error(error);
      }
    };
    movieCast();
  }, [id]);
  return (
    <div>
      <h2>Movie Cast</h2>
      {cast.map(item => (
        <p key={item.id}>{item.original_name}</p>
      ))}
    </div>
  );
};
