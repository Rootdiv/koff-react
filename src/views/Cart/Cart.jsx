import style from './Cart.module.scss';
import { Container } from '@/views/Container/Container';
import { CartGoods } from '@/components/CartGoods/CartGoods';
import { CartPlace } from '@/components/CartPlace/CartPlace';
import { CartForm } from '@/components/CartForm/CartForm';
import { useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';

export const Cart = () => {
  const { goods, loadingFetch, totalPrice, totalCount, deliveryPrice } = useSelector(state => state.cart);

  return (
    <section className={style.cart}>
      <Container className={style.container}>
        <h2 className={style.title}>Корзина</h2>
        {loadingFetch ? (
          <GridLoader color="#36d7b7" size={80} cssOverride={{ gridColumn: 1 }} />
        ) : goods.length > 0 ? (
          <>
            <CartGoods goods={goods} />
            <CartPlace totalPrice={totalPrice} totalCount={totalCount} deliveryPrice={deliveryPrice} />
            <CartForm />
          </>
        ) : (
          <p className={style.empty}>В корзину ничего не добавлено</p>
        )}
      </Container>
    </section>
  );
};
