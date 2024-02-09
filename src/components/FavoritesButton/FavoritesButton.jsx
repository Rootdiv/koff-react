import style from './FavoritesButton.module.scss';
import clsx from 'clsx';

import { addToFavorites, removeFromFavorites } from '@/store/favorites/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';

export const FavoritesButton = ({ className, id }) => {
  const dispatch = useDispatch();
  const { favoritesList } = useSelector(state => state.favorites);
  const isFavorites = favoritesList.includes(id);

  const handleFavoritesClick = () => {
    if (isFavorites) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  return (
    <button className={clsx(className, isFavorites && style.active)} type="button" onClick={handleFavoritesClick}>
      <svg width="16" height="16">
        <use href="/img/sprite.svg#favorites"></use>
      </svg>
    </button>
  );
};
