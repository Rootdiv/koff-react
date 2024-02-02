import { Container } from '@/views/Container/Container';
import { Logo } from '@/components/Logo/Logo';
import { Contacts } from '@/components/Contacts/Contacts';
import { Developers } from '@/components/Developers/Developers';

import style from './Footer.module.scss';

export const Footer = () => (
  <footer className={style.footer}>
    <Container className={style.container}>
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.contacts}>
        <Contacts />
      </div>
      <div className={style.developers}>
        <Developers />
      </div>
      <p className={style.copyright}>&copy; Koff, 2024</p>
    </Container>
  </footer>
);
