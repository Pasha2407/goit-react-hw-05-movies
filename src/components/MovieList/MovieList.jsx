import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

export const MovieList = ({ movies }) => {
  return (
    <div className={css.Container}>
      <h2>Trending movies today</h2>
      <ul className={css.List}>
        {movies.map(item => (
          <li key={item.id}>
            <Link to={`/movies/${item.id}`}>
              <img
                className={css.Image}
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              ></img>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
