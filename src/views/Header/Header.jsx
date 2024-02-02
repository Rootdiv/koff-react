import { Logo } from '@/components/Logo/Logo';
import { Navigation } from '@/components/Navigation/Navigation';
import { SearchForm } from '@/components/SearchForm/SearchForm';
import { Container } from '@/views/Container/Container';
import style from './Header.module.scss';

export const Header = () => (
  <header className={style.header}>
    <Container className={style.container}>
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.search}>
        <SearchForm />
      </div>
      <div className={style.navigation}>
        <Navigation />
      </div>
    </Container>
  </header>
);
