import { API_URL } from '@/const';
import style from './CardItem.module.scss';
import { Link } from 'react-router-dom';
import { FavoritesButton } from '@/components/FavoritesButton/FavoritesButton';
import { AddCardButton } from '@/components/AddCartButton/AddCartButton';

export const CardItem = ({ id, name, images: [image], price }) => (
  <article className={style.card}>
    <Link to={`/product/${id}`} className={`${style.link} ${style.linkImg}`}>
      <img src={`${API_URL}/${image}`} className={style.img} alt={name} />
    </Link>
    <div className={style.info}>
      <h3 className={style.title}>
        <Link to={`/product/${id}`} className={style.link}>
          {name}
        </Link>
      </h3>
      <p className={style.price}>{price.toLocaleString()}&nbsp;&#8381;</p>
    </div>
    <AddCardButton className={style.btn} id={id} />
    <FavoritesButton className={style.favorites} id={id} />
  </article>
);
