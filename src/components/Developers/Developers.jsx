import style from './Developers.module.scss';

export const Developers = () => (
  <ul className={style.developers}>
    <li className={style.item}>
      <span>Designer:&nbsp;</span>
      <a href="https://t.me/Mrshmallowww" className={style.link} target="_blank" rel="noreferrer">
        Anastasia Ilina
      </a>
    </li>
    <li className={style.item}>
      <span>Developer:&nbsp;</span>
      <a href="https://t.me/rootdiv" className={style.link} target="_blank" rel="noreferrer">
        Vladimir
      </a>
    </li>
  </ul>
);
