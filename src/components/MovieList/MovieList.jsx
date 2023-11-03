import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div className={css.Container}>
      <h2>Trending movies today</h2>
      <ul>
        {movies.map(item => (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`} state={{ from: location }}>
              <img
                className={css.Image}
                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                alt={item.title}
                style={{ width: '100%' }}
              ></img>
              <div className={css.Title}>
                <p>{item.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
