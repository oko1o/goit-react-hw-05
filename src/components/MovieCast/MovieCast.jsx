import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCreditsById } from '../../tmdb-api.js';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [creditsData, setCreditsData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const getCast = async () => {
      try {
        setError(false);
        setLoader(true);
        const data = await fetchMovieCreditsById(movieId);
        setCreditsData(data);
      } catch (error) {
        setError(true);
        setLoader(false);
      } finally {
        setLoader(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <ul className={css.list}>
      {loader && <p>Fetching data. Please wait...</p>}
      {error && <p>Something went wrong...</p>}
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
