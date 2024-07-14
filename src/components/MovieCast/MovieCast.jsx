import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCreditsById } from '../../tmdb-api.js';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [creditsData, setCreditsData] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    const getCast = async () => {
      try {
        const data = await fetchMovieCreditsById(movieId);
        console.log(data);
        setCreditsData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <ul className={css.list}>
      {creditsData
        ? creditsData.map((creditData) => (
            <li key={creditData.id} className={css.item}>
              {creditData.name}
            </li>
          ))
        : ''}
    </ul>
  );
}
