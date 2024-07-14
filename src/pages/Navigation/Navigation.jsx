import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${css.navlink} ${css.active}` : css.navlink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? `${css.navlink} ${css.active}` : css.navlink
          }
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
