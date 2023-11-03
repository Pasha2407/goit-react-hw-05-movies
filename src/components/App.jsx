import { Routes, Route, NavLink } from 'react-router-dom';
import { Home } from 'pages/Home';
import { Movies } from 'pages/Movies';
import { MovieDetails } from '../pages/MovieDetails/MovieDetails';
import { Cast } from './Cast';
import { Reviews } from './Reviews';
import css from './App.module.css';
export const App = () => {
  return (
    <div className={css.Wrapper}>
      <div className={css.Container}>
        <header>
          <h2>PRO MOVIE SEARCHER</h2>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/movies">Movies</NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
