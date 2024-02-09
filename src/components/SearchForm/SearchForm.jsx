import style from './SearchForm.module.scss';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SearchForm = () => {
  const navigate = useNavigate();
  const { search: searchUrl, pathname } = useLocation();
  const search = searchUrl.replace(/\?q=/, '').replace(/&(.*)/, '');
  const [searchValue, setSearchValue] = useState(search);
  const isSearchPage = pathname === '/search';

  useEffect(() => {
    !isSearchPage && setSearchValue('');
  }, [isSearchPage]);

  const handleSubmit = event => {
    event.preventDefault();
    const searchQuery = event.target.search.value;
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handlerSearch = event => {
    setSearchValue(event.target.value);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        placeholder="Введите запрос"
        className={style.input}
        onChange={handlerSearch}
        value={decodeURIComponent(searchValue)}
      />
      <button type="submit" className={style.button}>
        <svg width="16" height="16">
          <use href="/img/sprite.svg#search"></use>
        </svg>
      </button>
    </form>
  );
};
