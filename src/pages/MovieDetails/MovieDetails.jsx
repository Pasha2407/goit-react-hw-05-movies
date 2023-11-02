import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../components/api';
import { useEffect, useState } from 'react';

export const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const movieDetails = async () => {
      try {
        const movie = await fetchMovieDetails(id);
        setMovieDetails(movie);
        console.log(movie);
      } catch (error) {
        console.error(error);
      }
    };

    movieDetails();
  }, [id]);

  return (
    <div>
      <h2>Film - {movieDetails.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        style={{
          width: 200,
        }}
      />
      <p>{movieDetails.overview}</p>
    </div>
  );
};
