import { Container } from '@/views/Container/Container.jsx';
import style from './Card.module.scss';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, clearProduct } from '@/store/product/productSlice';

import { Slider } from '@/components/Slider/Slider';
import { FavoritesButton } from '@/components/FavoritesButton/FavoritesButton';
import { AddCardButton } from '@/components/AddCartButton/AddCartButton';
import { RingLoader } from 'react-spinners';

export const Card = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    data: { id, name: title, images, price, article, characteristics },
    error,
  } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProduct(productId));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, productId]);

  return (
    <section className={style.product}>
      <Container className={style.container}>
        {loading ? (
          <RingLoader color="#36d7b7" size={250} cssOverride={{ margin: '25px auto', gridColumn: '1/-1' }} />
        ) : error ? (
          <div className={style.error}>Ошибка: {error}</div>
        ) : (
          <>
            <h2 className={style.title}>{title}</h2>
            <Slider images={images} title={title} />
            <div className={style.info}>
              <p className={style.price}>{price?.toLocaleString()}&nbsp;&#8381;</p>
              <p className={style.article}>арт. {article}</p>
              <div className={style.characteristics}>
                <h3 className={style.characteristicsTitle}>Общие характеристики</h3>
                <table className={`${style.table}`}>
                  <tbody>
                    {characteristics?.map(([filed, value], i) => (
                      <tr key={i} className={style.row}>
                        <td className={style.filed}>{filed}</td>
                        <td className={style.value}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={style.btns}>
                <AddCardButton className={style.btn} id={id} />
                <FavoritesButton className={style.favorites} id={id} />
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};
