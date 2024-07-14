import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../tmdb-api';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const inputRef = useRef();
  const [moviesData, setMoviesData] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;
    const getMovies = async () => {
      try {
        setError(false);
        setLoader(true);
        const data = await fetchMoviesByQuery(query, page);
        console.log(data);
        setMoviesData(data.results);
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
    setQuery(inputRef.current.value);
    inputRef.current.value = '';
  };

  const isVisibleLoadMoreBtn = totalPages >= page && moviesData.length > 0;
  console.log(page);
  console.log(totalPages);

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
        {<LoadMoreBtn onClick={onLoadMore} />}
        {page}
      </ul>
    </section>
  );
}
