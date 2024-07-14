import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchTrandingMovie } from '../../tmdb-api.js';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';
import css from './HomePage.module.css';

export default function HomePage() {
  const [moviesData, setMoviesData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setError(false);
        setLoader(true);
        const data = await fetchTrandingMovie(page);
        setMoviesData((prevData) =>
          page === 1 ? data.results : [...prevData, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
        setLoader(false);
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getMovies();
  }, [page]);

  const onLoadMore = () => setPage(page + 1);

  return (
    <section>
      <ul className={css.list}>
        {loader && <p>Fetching data. Please wait...</p>}
        {error && <p>Something went wrong...</p>}
        {moviesData &&
          moviesData.map((movieData) => (
            <li key={movieData.id} className={css.item}>
              <Link to={`/movie/${movieData.id}`} className={css.link}>
                <img
                  src={
                    movieData.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                      : `https://dessertdivine.com.au/wp-content/uploads/2022/02/Image-Not-Available.png`
                  }
                  alt={movieData.title}
                />
                <p className={css.title}>{movieData.title}</p>
              </Link>
            </li>
          ))}
        {totalPages > page && <LoadMoreBtn onClick={onLoadMore} />}
      </ul>
    </section>
  );
}
