import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../tmdb-api';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const inputRef = useRef();
  const [moviesData, setMoviesData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;
    const getMovies = async () => {
      try {
        setError(false);
        setLoader(true);
        const data = await fetchMoviesByQuery(query, page);
        setMoviesData((prevData) =>
          page === 1 ? data.results : [...prevData, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(true);
        setLoader(false);
      } finally {
        setLoader(false);
      }
    };
    getMovies();
  }, [query, page]);

  const handleClick = (e) => {
    e.preventDefault();
    searchParams.set('query', inputRef.current.value);
    setSearchParams(searchParams);
    inputRef.current.value = '';
    setPage(1);
  };

  const onLoadMore = () => setPage(page + 1);

  return (
    <section className={css.section}>
      <div className={css.search}>
        <input type="text" ref={inputRef} />
        <button type="button" onClick={handleClick}>
          Search movie
        </button>
      </div>
      <ul className={css.list}>
        {loader && <p>Fetching data. Please wait...</p>}
        {error && <p>Something went wrong...</p>}
        {moviesData.map((movieData) => (
          <li key={movieData.id} className={css.item}>
            <Link
              to={`/movie/${movieData.id}`}
              state={location}
              className={css.link}
            >
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
