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
      <h2>Movie Reviews</h2>
      {reviews.map(item => (
        <div key={item.id}>
          <p>{item.author}</p>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
