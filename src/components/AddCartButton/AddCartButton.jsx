import { addProductToCard, removeProductFromCard } from '@/store/cart/cartSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const AddCartButton = ({ className, id }) => {
  const dispatch = useDispatch();
  const { goods } = useSelector(state => state.cart);
  const product = goods.find(item => item.id === id);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    setIsAddingToCart(false);
  }, [product]);

  const handleClick = () => {
    setIsAddingToCart(true);
    if (product) {
      dispatch(removeProductFromCard(id));
    } else {
      dispatch(addProductToCard({ productId: id, quantity: 1 }));
    }
  };

  return (
    <button className={className} type="button" disabled={isAddingToCart} onClick={handleClick}>
      {product ? 'Из корзины' : 'В корзину'}
    </button>
  );
};
