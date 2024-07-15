import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetailsById } from '../../tmdb-api';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const backPathRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    if (!movieId) return;
    const getMovie = async () => {
      try {
        setError(false);
        setLoader(true);
        setMovieData([]);
        const data = await fetchMovieDetailsById(movieId);
        setMovieData(data);
      } catch (error) {
        setError(true);
        setLoader(false);
      } finally {
        setLoader(false);
      }
    };
    getMovie();
  }, [movieId]);

  return (
    <section className={css.section}>
      <div className={css.status}>
        {loader && <p>Fetching data. Please wait...</p>}
        {error && <p>Something went wrong...</p>}
      </div>
      <Link to={backPathRef.current} className={css.back}>
        Back
      </Link>
      <div className={css.header}>
        <div className={css.poster}>
          <img
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                : `https://dessertdivine.com.au/wp-content/uploads/2022/02/Image-Not-Available.png`
            }
            alt={movieData.title}
          />
        </div>
        <div className={css.info}>
          <h1>{movieData.title}</h1>
          <p>Rating {movieData.vote_average}</p>
          <div className={css.overview}>
            <p className={css.subtitle}>Overview</p>
            <p>{movieData.overview}</p>
          </div>
          <div className={css.genres}>
            <p className={css.subtitle}>Genres</p>
            <p>
              {movieData.genres
                ? movieData.genres.map((genre) => genre.name).join(', ')
                : ''}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2>Additional information</h2>
        <ul className={css.extra}>
          <li>
            <Link to={`credits`}>Cast</Link>
          </li>
          <li>
            <Link to={`reviews`}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </section>
  );
}
