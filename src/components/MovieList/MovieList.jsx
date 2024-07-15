import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ moviesData }) {
  const location = useLocation();
  const defaultImg =
    'https://dessertdivine.com.au/wp-content/uploads/2022/02/Image-Not-Available.png';

  return moviesData.map((movieData) => (
    <li key={movieData.id} className={css.item}>
      <Link to={`/movie/${movieData.id}`} state={location} className={css.link}>
        <img
          src={
            movieData.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
              : `${defaultImg}`
          }
          alt={movieData.title}
        />
        <p className={css.title}>{movieData.title}</p>
      </Link>
    </li>
  ));
}
