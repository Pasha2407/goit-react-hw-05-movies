import { Home } from 'pages/Home';
import { Movies } from 'pages/Movies';
import { MovieDetails } from './MovieDetails/MovieDetails';
import { Routes, Route, Link } from 'react-router-dom';
import css from './App.module.css';
export const App = () => {
  return (
    <div className={css.Wrapper}>
      <div className={css.Container}>
        <header className={css.Header}>
          <h2>PRO MOVIE SEARCHER</h2>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
          </nav>
        </header>
        <main className={css.Main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
