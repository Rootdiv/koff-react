import { Container } from '@/views/Container/Container';
import style from './PageNotFound.module.scss';
import { useRouteError } from 'react-router-dom';

export const PageNotFound = () => {
  const routeError = useRouteError();
  return (
    <Container className={style.error}>
      <h2 className={style.title}>Произошла ошибка, попробуйте зайти позже</h2>
      <p className={style.message}>{routeError?.message ?? 'Неизвестная ошибка'}</p>
    </Container>
  );
};
