import style from './Breadcrumbs.module.scss';
import { Container } from '@/views/Container/Container';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Breadcrumbs = ({ page }) => {
  const [searchParam] = useSearchParams();
  const category = searchParam.get('category');
  const { data, loading } = useSelector(state => state.product);

  return (
    !loading && (
      <div className={style.breadcrumbs}>
        <Container>
          <ul className={style.list}>
            <li className={style.item}>
              <Link to="/">Главная</Link>
              <span className={style.separator}>&gt;</span>
            </li>
            {data.category && (
              <li className={style.item}>
                <Link to={`/category?category=${data.category}`}>{data.category}</Link>
                <span className={style.separator}>&gt;</span>
              </li>
            )}
            <li className={style.item}>
              <a>{page || category || data?.name}</a>
              <span className={style.separator}>&gt;</span>
            </li>
          </ul>
        </Container>
      </div>
    )
  );
};
