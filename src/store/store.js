import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth/authSlice';
import categoriesReducer from '@/store/categories/categoriesSlice';
import goodsReducer from '@/store/goods/goodsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    goods: goodsReducer,
  },
});
