import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from './api';
import css from './Cast.module.css';

const Cast = () => {
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
      <h2>Movie Cast 👇</h2>
      {cast.length > 0 ? (
        <ul className={css.List}>
          {cast.map(item => (
            <li key={item.id}>
              <img
                style={{ width: '100%', borderRadius: '10px' }}
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w300${item.profile_path}`
                    : require('./images/noimage2.jpg')
                }
                alt=""
              ></img>
              <div className={css.ActorName}>
                <p>{item.original_name}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <i>No cast found</i>
      )}
    </div>
  );
};

export default Cast;
