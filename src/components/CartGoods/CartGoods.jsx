import { API_URL } from '@/const';
import style from './CartGoods.module.scss';
import { useDispatch } from 'react-redux';
import { removeProductFromCard, updateProductInCard } from '@/store/cart/cartSlice';
import { useEffect, useState } from 'react';

export const CartGoods = ({ goods }) => {
  const dispatch = useDispatch();
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setIsChanging(false);
  }, [goods]);

  const decrementButton = (id, quantity) => {
    setIsChanging(true);
    if (quantity > 1) {
      dispatch(
        updateProductInCard({
          productId: id,
          quantity: quantity - 1,
        }),
      );
    } else {
      dispatch(removeProductFromCard(id));
    }
  };

  const incrementButton = (id, quantity) => {
    setIsChanging(true);
    dispatch(
      updateProductInCard({
        productId: id,
        quantity: quantity + 1,
      }),
    );
  };

  return (
    <ul className={style.goods}>
      {goods.map(({ id, images: [image], name, price, article, quantity }) => (
        <li className={style.product} key={id}>
          <img src={`${API_URL}/${image}`} alt={name} className={style.img} />
          <h3 className={style.titleProduct}>{name}</h3>
          <p className={style.price}>{price.toLocaleString()}&nbsp;&#8381;</p>
          <p className={style.article}>арт. {article}</p>
          <div className={style.productControl}>
            <button
              type="button"
              disabled={isChanging}
              className={style.productBtn}
              onClick={() => decrementButton(id, quantity)}>
              -
            </button>
            <p className={style.productCount}>{quantity}</p>
            <button
              type="button"
              disabled={isChanging}
              className={style.productBtn}
              onClick={() => incrementButton(id, quantity)}>
              +
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
