import style from './Container.module.scss';

// eslint-disable-next-line no-confusing-arrow
export const Container = ({ children, className }) =>
  className ? (
    <div className={`${style.container} ${className}`}>{children}</div>
  ) : (
    <div className={style.container}>{children}</div>
  );
