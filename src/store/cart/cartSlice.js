import { API_URL } from '@/const';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.accessKey;

  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Не удалось загрузить данные для корзины');
    }
    return response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addProductToCard = createAsyncThunk(
  'cart/addProductToCard',
  async (productData, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.accessKey;

    try {
      const response = await fetch(`${API_URL}/api/cart/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Не удалось добавить товар в корзину');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeProductToCard = createAsyncThunk(
  'cart/removeProductToCard',
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.accessKey;

    try {
      const response = await fetch(`${API_URL}/api/cart/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Не удалось удалить товар из корзины');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  goods: [],
  totalPrice: 0,
  totalCount: 0,
  loadingFetch: false,
  loadingAdd: false,
  loadingUpdate: false,
  loadingRemove: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.loadingFetch = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loadingFetch = false;
        state.goods = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        state.totalCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loadingFetch = false;
        state.error = action.error.message;
      })
      .addCase(addProductToCard.pending, state => {
        state.loadingAdd = true;
        state.error = null;
      })
      .addCase(addProductToCard.fulfilled, (state, action) => {
        state.loadingAdd = false;
        state.goods.push({ ...action.payload.product, ...action.payload.productCart });
        state.totalPrice = state.goods.reduce((acc, item) => acc + item.price * item.quantity, 0);
        state.totalCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(addProductToCard.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.error.message;
      })
      .addCase(removeProductToCard.pending, state => {
        state.loadingAdd = true;
        state.error = null;
      })
      .addCase(removeProductToCard.fulfilled, (state, action) => {
        state.loadingAdd = false;
        const index = state.goods.findIndex(item => item.id === action.payload.id);
        state.goods.splice(index, 1);
        state.totalPrice = state.goods.reduce((acc, item) => acc + item.price * item.quantity, 0);
        state.totalCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(removeProductToCard.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
