import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../components/api';
import { useEffect, useState, useRef, Suspense } from 'react';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const back = useRef(location.state?.from || '/');

  useEffect(() => {
    const movieDetails = async () => {
      try {
        const movie = await fetchMovieDetails(id);
        setMovieDetails(movie);
      } catch (error) {
        console.error(error);
      }
    };
    movieDetails();
  }, [id]);

  return (
    <div className={css.Wrapper}>
      <Link to={back.current}>Go back</Link>
      <div className={css.Container}>
        <aside>
          <img
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : require('../../components/images/noimage2.jpg')
            }
            alt={movieDetails.title}
            style={{
              width: 200,
            }}
          />
        </aside>
        <div>
          <h2>{movieDetails.title}</h2>
          <b>User score: {movieDetails.vote_average}</b>
          <h3>Overview</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <p>
            {movieDetails.genres?.map(item => (
              <span key={item.id}> {item.name}</span>
            ))}
          </p>
          <h3>Production companies</h3>
          <section>
            {movieDetails.production_companies?.map(
              item =>
                item.logo_path && (
                  <img
                    key={item.id}
                    src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                    alt={item.name}
                    style={{ width: 70 }}
                  ></img>
                )
            )}
          </section>
          <b>Release date: {movieDetails.release_date}</b>
        </div>
      </div>
      <div>
        <h2>Additional information</h2>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
