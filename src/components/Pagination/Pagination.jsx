import { Link, useLocation, useSearchParams } from 'react-router-dom';
import style from './Pagination.module.scss';
import clsx from 'clsx';

export const Pagination = ({ pagination: { currentPage, totalPages } }) => {
  const [searchParam] = useSearchParams();
  const location = useLocation();

  const currentPageNumber = parseInt(searchParam.get('page')) || currentPage;

  const createPageUrl = pageNumber => {
    const newSearchParams = new URLSearchParams(searchParam);
    newSearchParams.set('page', pageNumber.toString());
    return `${location.pathname}?${newSearchParams.toString()}`;
  };

  const prevPageNumber = currentPageNumber - 1;
  const nextPageNumber = currentPageNumber + 1;

  const prevPageUrl = prevPageNumber > 0 ? createPageUrl(prevPageNumber) : '';
  const nextPageUrl = nextPageNumber <= totalPages ? createPageUrl(nextPageNumber) : '';

  return (
    <div className={style.pagination}>
      <div className={style.bar}>
        <div className={style.barWidth} style={{ width: `calc((${currentPageNumber} / ${totalPages}) * 100%)` }} />
      </div>
      <div className={style.arrows}>
        <Link to={prevPageUrl} className={clsx(style.left, !prevPageUrl && style.disabled)}>
          <svg width="16" height="16">
            <use href="/img/sprite.svg#left"></use>
          </svg>
        </Link>
        <p className={style.info}>
          <span className={style.current}>{currentPageNumber}</span>
          из
          <span className={style.total}>{totalPages}</span>
        </p>
        <Link to={nextPageUrl} className={clsx(style.right, !nextPageUrl && style.disabled)}>
          <svg width="16" height="16">
            <use href="/img/sprite.svg#right"></use>
          </svg>
        </Link>
      </div>
    </div>
  );
};
