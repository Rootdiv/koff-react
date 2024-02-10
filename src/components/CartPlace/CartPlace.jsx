import style from './CartPlace.module.scss';

export const CartPlace = () => (
  <div className={style.place}>
    <h3 className={style.subtitle}>Оформление</h3>
    <div className={style.placeInfo}>
      <p>2 товара на сумму:</p>
      <p>268&nbsp;500&nbsp;₽</p>
    </div>
    <p className={style.placeDelivery}>Доставка 500 ₽</p>
    <button type="submit" className={style.placeBtn}>
      Оформить заказ
    </button>
  </div>
);
