import style from './Contacts.module.scss';

export const Contacts = () => (
  <>
    <a href="tel:+79398391297" className={`${style.phone} ${style.link}`}>
      <svg width="16" height="16">
        <use href="/img/sprite.svg#phone"></use>
      </svg>
      <span>+7 (939) 839 12 97</span>
    </a>
    <ul className={style.list}>
      <li className={style.item}>
        <a className={style.link} href="#" aria-label="Ссылка на группу в VK">
          <svg width="16" height="16">
            <use href="/img/sprite.svg#vk"></use>
          </svg>
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="#" aria-label="Ссылка на канал в Youtube">
          <svg width="16" height="16">
            <use href="/img/sprite.svg#youtube"></use>
          </svg>
        </a>
      </li>
      <li className={style.item}>
        <a className={style.link} href="#" aria-label="Ссылка на чат Telegram">
          <svg width="16" height="16">
            <use href="/img/sprite.svg#telegram"></use>
          </svg>
        </a>
      </li>
    </ul>
  </>
);
