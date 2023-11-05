import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from './api';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const movieReviews = async () => {
      try {
        const response = await fetchMovieReviews(id);
        setReviews(response);
      } catch (error) {
        console.error(error);
      }
    };
    movieReviews();
  }, [id]);
  return (
    <div>
      <h2>Movie Reviews 👇</h2>
      {reviews.length > 0 ? (
        <div>
          {reviews.map(item => (
            <div key={item.id}>
              <b>{item.author}</b>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <i>No reviews found</i>
      )}
    </div>
  );
};

export default Reviews;
