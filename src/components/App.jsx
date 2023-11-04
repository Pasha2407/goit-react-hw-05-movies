import { Suspense, lazy } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import css from './App.module.css';
import { Home } from '../pages/Home';
import { Loader } from './Loader';

const Movies = lazy(() => import('../pages/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast'));
const Reviews = lazy(() => import('./Reviews'));

export const App = () => {
  return (
    <div className={css.Wrapper}>
      <div className={css.Container}>
        <header>
          <h2>PRO MOVIE SEARCHER</h2>
          <nav id="nav">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                background: isActive ? '#be4040' : '',
                color: isActive ? 'white' : 'black',
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              style={({ isActive }) => ({
                background: isActive ? '#be4040' : '',
                color: isActive ? 'white' : 'black',
              })}
            >
              Movies
            </NavLink>
          </nav>
        </header>
        <main>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetails />}>
                <Route path="cast" element={<Cast />} />
                <Route path="reviews" element={<Reviews />} />
              </Route>
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};
