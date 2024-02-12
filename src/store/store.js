import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth/authSlice';
import categoriesReducer from '@/store/categories/categoriesSlice';
import goodsReducer from '@/store/goods/goodsSlice';
import productReducer from '@/store/product/productSlice';
import favoritesReducer from '@/store/favorites/favoritesSlice';
import { apiTokenError } from '@/store/middleware';
import cartReducer from '@/store/cart/cartSlice';
import formCartReducer from '@/store/formCart/formCartSlice';
import orderReducer from '@/store/order/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    goods: goodsReducer,
    product: productReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    formCart: formCartReducer,
    order: orderReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiTokenError),
});
