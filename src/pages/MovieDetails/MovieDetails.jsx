import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../components/api';
import { useEffect, useState, useRef, Suspense } from 'react';
import css from './MovieDetails.module.css';
import { Loader } from 'components/Loader';
import { IconContext } from 'react-icons';
import { IoMdArrowRoundBack } from 'react-icons/io';

const MovieDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 700);
      }
    };
    movieDetails();
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div
      style={{
        backgroundImage:
          'url(' +
          `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}` +
          ')',
        backgroundSize: 'cover',
        backgroundPositionX: 'center',
        backgroundPositionY: '100px',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className={css.Wrapper}>
          <Link to={back.current}>
            <IconContext.Provider value={{ color: '#be4040', size: 30 }}>
              <IoMdArrowRoundBack />
            </IconContext.Provider>
            Go back
          </Link>
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
                  width: 240,
                }}
              />
            </aside>
            <div className={css.Title}>
              <h2>{movieDetails.title}</h2>
              <b>User score: {Math.round(movieDetails.vote_average * 10)}%</b>
              <h3>Overview</h3>
              {movieDetails.overview.length > 0 ? (
                <p> {movieDetails.overview}</p>
              ) : (
                <i>No overview found</i>
              )}
              <h3>Genres</h3>
              {movieDetails.genres.length > 0 ? (
                <p>
                  {movieDetails.genres?.map(item => (
                    <span key={item.id}> {item.name}</span>
                  ))}
                </p>
              ) : (
                <i>No genres found</i>
              )}
              <h3>Production companies</h3>
              {movieDetails.production_companies.length > 0 ? (
                <section>
                  {movieDetails.production_companies?.map(
                    item =>
                      item.logo_path && (
                        <img
                          key={item.id}
                          src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                          alt={item.name}
                          style={{ height: 30, maxWidth: 80 }}
                        ></img>
                      )
                  )}
                </section>
              ) : (
                <i>No company found</i>
              )}
              <h3>Release date: {movieDetails.release_date}</h3>
            </div>
          </div>
          <div className={css.LinkButton}>
            <h3>Additional information</h3>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
          </div>
          <Suspense
            fallback={
              <p style={{ paddingLeft: 30 }}>
                <i>Loading...</i>
              </p>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
