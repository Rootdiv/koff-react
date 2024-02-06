import { Link } from 'react-router-dom';
import style from './Logo.module.scss';

export const Logo = () => (
  <Link to="/">
    <img src="/img/logo.svg" alt="Логотип мебельного маркета Koff" className={style.img} />
  </Link>
);
