import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviewsById } from '../../tmdb-api.js';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviewsData, setReviewsData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const getReviews = async () => {
      try {
        setError(false);
        setLoader(true);
        const data = await fetchMovieReviewsById(movieId);
        setReviewsData(data);
      } catch (error) {
        setError(true);
        setLoader(false);
      } finally {
        setLoader(false);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <>
      <ul className={css.list}>
        {loader && <p>Fetching data. Please wait...</p>}
        {error && <p>Something went wrong...</p>}
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
      <div className={css.status}>
        {loader && <p>Fetching data. Please wait...</p>}
        {error && <p>Something went wrong...</p>}
      </div>
    </>
  );
}
