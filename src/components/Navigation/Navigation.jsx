import { Link } from 'react-router-dom';
import style from './Navigation.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCart } from '@/store/cart/cartSlice';

export const Navigation = () => {
  const dispatch = useDispatch();
  const { totalCount } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <nav className={style.navigation}>
      <Link className={style.link} to="/favorites">
        <span className={style.linkText}>Избранное</span>
        <svg width="16" height="16" className={style.favorite}>
          <use href="/img/sprite.svg#favorites"></use>
        </svg>
      </Link>
      <Link className={style.link} to="/cart">
        <span className={style.linkText}>Корзина</span>
        <span className={style.count}>({totalCount})</span>
        <svg width="16" height="16">
          <use href="/img/sprite.svg#cart"></use>
        </svg>
      </Link>
    </nav>
  );
};
