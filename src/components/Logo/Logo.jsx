import style from './Logo.module.scss';

export const Logo = () => (
  <a href="/">
    <img src="/img/logo.svg" alt="Логотип мебельного маркета Koff" className={style.img} />
  </a>
);
