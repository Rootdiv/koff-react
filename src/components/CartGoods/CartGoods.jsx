import { API_URL } from '@/const';
import style from './CartGoods.module.scss';

export const CartGoods = ({ goods }) => (
  <ul className={style.goods}>
    {goods.map(({ id, images: [image], name, price, article, quantity }) => (
      <li className={style.product} key={id}>
        <img src={`${API_URL}/${image}`} alt={name} className={style.img} />
        <h3 className={style.titleProduct}>{name}</h3>
        <p className={style.price}>{price.toLocaleString()}&nbsp;&#8381;</p>
        <p className={style.article}>арт. {article}</p>
        <div className={style.productControl}>
          <button className={style.productBtn} type="button">
            -
          </button>
          <p className={style.productCount}>{quantity}</p>
          <button className={style.productBtn} type="button">
            +
          </button>
        </div>
      </li>
    ))}
  </ul>
);
