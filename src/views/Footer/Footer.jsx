import { Container } from '@/views/Container/Container';
import { Logo } from '@/components/Logo/Logo';
import { Contacts } from '@/components/Contacts/Contacts';
import { Developer } from '@/components/Developer/Developer';

import style from './Footer.module.scss';

export const Footer = () => (
  <footer>
    <Container className={style.container}>
      <Logo />
      <Contacts />
      <Developer />
      <p className={style.copyright}>&copy; Koff, 2024</p>
    </Container>
  </footer>
);
