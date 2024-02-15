import style from './Order.module.scss';
import { Link, useParams } from 'react-router-dom';
import { Container } from '@/views/Container/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCart } from '@/store/cart/cartSlice';
import { clearOrder, fetchOrder } from '@/store/order/orderSlice';
import { clearFormCart } from '@/store/formCart/formCartSlice';

export const Order = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { orderData, loading, error } = useSelector(state => state.order);

  const totalPrice = parseInt(orderData.totalPrice) + (orderData.deliveryType === 'delivery' ? 500 : 0);

  const deliveryTypeList = {
    delivery: 'Доставка',
    pickup: 'Самовывоз',
  };

  const paymentTypeList = {
    card: 'Картой при получении',
    cash: 'Наличными при получении',
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrder(orderId));

    return () => {
      dispatch(clearOrder());
      dispatch(clearFormCart());
    };
  }, [dispatch, orderId]);

  return (
    <section className={style.order}>
      <Container className={style.container}>
        <div className={style.content}>
          {loading ? (
            <div>Загрузка данных...</div>
          ) : !orderData.id && error ? (
            <div>Заказ не найден. Ошибка: {error}</div>
          ) : (
            <>
              <div className={style.header}>
                <h2 className={style.title}>Заказ успешно размещен</h2>
                <p className={style.price}>{totalPrice?.toLocaleString()}&nbsp;&#8381;</p>
              </div>
              <p className={style.number}>&#8470;{orderData.id}</p>
              <table className={style.table}>
                <caption className={style.tableTitle}>Данные доставки</caption>
                <tbody>
                  <tr className={style.row}>
                    <td className={style.field}>Получатель</td>
                    <td className={style.value}>{orderData.name}</td>
                  </tr>
                  <tr className={style.row}>
                    <td className={style.field}>Телефон</td>
                    <td className={style.value}>{orderData.phone}</td>
                  </tr>
                  <tr className={style.row}>
                    <td className={style.field}>E-mail</td>
                    <td className={style.value}>{orderData.email}</td>
                  </tr>
                  {orderData.address && (
                    <tr className={style.row}>
                      <td className={style.field}>Адрес доставки</td>
                      <td className={style.value}>{orderData.address}</td>
                    </tr>
                  )}
                  <tr className={style.row}>
                    <td className={style.field}>Способ оплаты</td>
                    <td className={style.value}>{paymentTypeList[orderData.paymentType]}</td>
                  </tr>
                  <tr className={style.row}>
                    <td className={style.field}>Способ получения</td>
                    <td className={style.value}>{deliveryTypeList[orderData.deliveryType]}</td>
                  </tr>
                </tbody>
              </table>
              <Link className={style.linkBtn} to="/">
                На главную
              </Link>
            </>
          )}
        </div>
      </Container>
    </section>
  );
};
