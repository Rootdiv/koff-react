import style from './CardItem.module.scss';

export const CardItem = () => (
  <article className={style.card}>
    <a className={`${style.link} ${style.linkImg}`} href="#">
      <img src="/img/photo.jpg" className={style.img} alt="Кресло с подлокотниками" />
    </a>
    <div className={style.info}>
      <h3 className={style.title}>
        <a href="#" className={style.link}>
          Кресло с подлокотниками
        </a>
      </h3>
      <p className={style.price}>5&nbsp;000&nbsp;&#8381;</p>
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
