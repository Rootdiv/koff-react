import clsx from 'clsx';
import style from './Container.module.scss';

export const Container = ({ children, className }) => (
  <div className={clsx(style.container, className)}>{children}</div>
);
