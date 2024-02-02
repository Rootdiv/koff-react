import style from './SearchForm.module.scss';

export const SearchForm = () => (
  <form className={style.form}>
    <input type="search" name="search" placeholder="Введите запрос" className={style.input} />
    <button type="submit" className={style.button}>
      <svg width="16" height="16">
        <use href="/img/sprite.svg#search"></use>
      </svg>
    </button>
  </form>
);
