import { Container } from '@/views/Container/Container';
import style from './Catalog.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '@/store/categories/categoriesSlice';
import { Link } from 'react-router-dom';

export const Catalog = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.categories);

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
            <Link className={style.link} to={`/category?slug=${item}`}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};
