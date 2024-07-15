import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../tmdb-api';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import MovieList from '../../components/MovieList/MovieList.jsx';
import SearchMovies from '../../components/SearchMovies/SearchMovies.jsx';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [moviesData, setMoviesData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  const handleSearch = (searchValue) => {
    searchParams.set('query', searchValue);
    setSearchParams(searchParams);
    setPage(1);
  };

  const onLoadMore = () => setPage(page + 1);

  return (
    <section className={css.section}>
      <SearchMovies onSearch={handleSearch} />
      <ul className={css.list}>
        {moviesData && <MovieList moviesData={moviesData} />}
      </ul>
      <div className={css.loadMore}>
        {totalPages > page && <LoadMoreBtn onClick={onLoadMore} />}
      </div>
      <div className={css.status}>
        {loader && <p>Fetching data. Please wait...</p>}
        {error && <p>Something went wrong...</p>}
      </div>
    </section>
  );
}
