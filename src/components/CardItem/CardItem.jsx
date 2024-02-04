import { API_URL } from '@/const';
import style from './CardItem.module.scss';

export const CardItem = ({ name, images: [image], price }) => (
  <article className={style.card}>
    <a className={`${style.link} ${style.linkImg}`} href="#">
      <img src={`${API_URL}/${image}`} className={style.img} alt={name} />
    </a>
    <div className={style.info}>
      <h3 className={style.title}>
        <a href="#" className={style.link}>
          {name}
        </a>
      </h3>
      <p className={style.price}>{price.toLocaleString()}&nbsp;&#8381;</p>
    </div>
    <button className={style.btn} type="button">
      В корзину
    </button>
    <button className={style.favorite} type="button">
      <svg width="16" height="16" className={style.svg}>
        <use href="/img/sprite.svg#favorite"></use>
      </svg>
    </button>
  </article>
);
