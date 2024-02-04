import { Container } from '@/views/Container/Container';
import style from './Goods.module.scss';
import { CardItem } from '@/components/CardItem/CardItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGoods } from '@/store/goods/goodsSlice';

export const Goods = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(state => state.goods);

  useEffect(() => {
    dispatch(fetchGoods());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {data}</div>;

  return (
    <section className={style.goods}>
      <Container>
        <h2 className={`${style.title} visually-hidden`}></h2>
        <ul className={style.list}>
          {data.map(item => (
            <li key={item.id}>
              <CardItem {...item} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
