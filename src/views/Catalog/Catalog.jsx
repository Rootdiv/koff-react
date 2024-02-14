import { Container } from '@/views/Container/Container';
import style from './Catalog.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '@/store/categories/categoriesSlice';
import { Link, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

export const Catalog = () => {
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const { data, loading, error } = useSelector(state => state.categories);
  const category = searchParam.get('category');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <Container className={style.catalog}>
      <ul className={style.list}>
        {data.map((item, i) => (
          <li className={style.item} key={i}>
            <Link className={clsx(style.link, category === item && style.linkActive)} to={`/category?category=${item}`}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};
