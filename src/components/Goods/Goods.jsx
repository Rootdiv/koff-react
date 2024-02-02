import { Container } from '@/views/Container/Container';
import style from './Goods.module.scss';
import { CardItem } from '@/components/CardItem/CardItem';

export const Goods = () => (
  <section className={style.goods}>
    <Container>
      <h2 className={`${style.title} visually-hidden`}></h2>
      <ul className={style.list}>
        <li>
          <CardItem />
        </li>
        <li>
          <CardItem />
        </li>
        <li>
          <CardItem />
        </li>
        <li>
          <CardItem />
        </li>
      </ul>
    </Container>
  </section>
);
