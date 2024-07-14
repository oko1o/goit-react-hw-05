import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviewsById } from '../../tmdb-api.js';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviewsById(movieId);
        console.log(data);
        setReviewsData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <ul className={css.list}>
      {reviewsData
        ? reviewsData.map((reviewData) => (
            <li key={reviewData.id} className={css.item}>
              <p>{reviewData.author}</p>
              <p>{reviewData.created_at}</p>
              <p>{reviewData.content}</p>
            </li>
          ))
        : ''}
    </ul>
  );
}
