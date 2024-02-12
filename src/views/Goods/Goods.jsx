import { Container } from '@/views/Container/Container';
import style from './Goods.module.scss';
import { CardItem } from '@/components/CardItem/CardItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGoods } from '@/store/goods/goodsSlice';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Pagination } from '@/components/Pagination/Pagination';
import clsx from 'clsx';

export const Goods = () => {
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const { data, loading, error, pagination } = useSelector(state => state.goods);
  const { favoritesList } = useSelector(state => state.favorites);
  const { pathname } = useLocation();

  const category = searchParam.get('category');
  const q = searchParam.get('q');
  const page = searchParam.get('page');

  let list = null;
  const isFavoritesPage = pathname === '/favorites';

  if (isFavoritesPage) {
    list = favoritesList.join(',');
  }

  useEffect(() => {
    if (!isFavoritesPage) {
      dispatch(fetchGoods({ category, q, page }));
    }
  }, [dispatch, category, q, page, isFavoritesPage]);

  useEffect(() => {
    if (isFavoritesPage && list) {
      dispatch(fetchGoods({ list, page }));
    }
  }, [dispatch, isFavoritesPage, list, page]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {data}</div>;

  return (
    <section className={style.goods}>
      <Container>
        <h2 className={clsx(style.title, !(list || q) && 'visually-hidden')}>
          {list ? 'Избранное' : q ? 'Результаты поиска:' : 'Список товаров'}
        </h2>
        {data.length ? (
          <>
            <ul className={style.list}>
              {data.map(item => (
                <li key={item.id}>
                  <CardItem {...item} />
                </li>
              ))}
            </ul>
            {pagination?.totalPages > 1 && <Pagination pagination={pagination} />}
          </>
        ) : (
          (!list && isFavoritesPage && <p className={style.empty}>Вы ничего не добавили в избранное</p>) ||
          (category && <p className={style.empty}>Категория не существует</p>) || (
            <p className={style.empty}>По Вашему запросу ничего не найдено</p>
          )
        )}
      </Container>
    </section>
  );
};
