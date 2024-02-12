import { declOfNum } from '@/helpers/declOfNum';
import style from './CartPlace.module.scss';

export const CartPlace = ({ totalPrice, totalCount, deliveryPrice }) => (
  <div className={style.place}>
    <h3 className={style.subtitle}>Оформление</h3>
    <div className={style.placeInfo}>
      <p>{declOfNum(totalCount, ['товар', 'товара', 'товаров'])} на сумму:</p>
      <p>{totalPrice.toLocaleString()}&nbsp;&#8381;</p>
    </div>
    <p className={style.placeDelivery}>Доставка {deliveryPrice}&nbsp;&#8381;</p>
    <button type="submit" className={style.placeBtn} form="orderForm">
      Оформить заказ
    </button>
  </div>
);
