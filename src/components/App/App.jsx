import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const Navigation = lazy(() => import('../../pages/Navigation/Navigation'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);
import css from './App.module.css';

function App() {
  return (
    <main className={css.main}>
      <Navigation />
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:movieId" element={<MovieDetailsPage />}>
            <Route path="credits" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
