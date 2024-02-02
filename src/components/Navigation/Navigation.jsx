import style from './Navigation.module.scss';

export const Navigation = () => (
  <nav className={style.navigation}>
    <a className={style.link} href="/favorite">
      <span className={style.linkText}>Избранное</span>
      <svg width="16" height="16" className={style.favorite}>
        <use href="/img/sprite.svg#favorite"></use>
      </svg>
    </a>
    <a className={style.link} href="/cart">
      <span className={style.linkText}>Корзина</span>
      <span className={style.count}>(0)</span>
      <svg width="16" height="16">
        <use href="/img/sprite.svg#cart"></use>
      </svg>
    </a>
  </nav>
);
