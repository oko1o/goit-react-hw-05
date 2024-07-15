import css from './SearchMovies.module.css';

export default function SearchMovies({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e.target.elements[0].value);
    e.target.elements[0].value = '';
  };

  return (
    <div className={css.search}>
      <form action="submit" onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Search movie</button>
      </form>
    </div>
  );
}
