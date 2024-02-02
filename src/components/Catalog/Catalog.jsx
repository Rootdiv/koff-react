import { Container } from '@/views/Container/Container';
import style from './Catalog.module.scss';

export const Catalog = () => (
  <Container className={style.catalog}>
    <ul className={style.list}>
      <li className={style.item}>
        <a className={style.link} href="/category?slug=Диваны">
          Диваны
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="/category?slug=Шкафы">
          Шкафы
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="/category?slug=Стулья">
          Стулья
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="/category?slug=Тумбы">
          Тумбы
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="/category?slug=Кровати">
          Кровати
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="/category?slug=Столы">
          Столы
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="/category?slug=Комоды">
          Комоды
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="/category?slug=Матрасы">
          Матрасы
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="/category?slug=Пуфики">
          Пуфики
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="/category?slug=Стеллажи">
          Стеллажи
        </a>
      </li>
    </ul>
  </Container>
);
