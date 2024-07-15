import { useState, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchTrandingMovie } from '../../tmdb-api.js';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';
import MovieList from '../../components/MovieList/MovieList.jsx';
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
