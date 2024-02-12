import { addProductToCard, removeProductFromCard } from '@/store/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export const AddCardButton = ({ className, id }) => {
  const dispatch = useDispatch();
  const { goods } = useSelector(state => state.cart);
  const product = goods.find(item => item.id === id);

  const handleClick = () => {
    if (product) {
      dispatch(removeProductFromCard(id));
    } else {
      dispatch(addProductToCard({ productId: id, quantity: 1 }));
    }
  };

  return (
    <button className={className} type="button" onClick={handleClick}>
      {product ? 'Из корзины' : 'В корзину'}
    </button>
  );
};
