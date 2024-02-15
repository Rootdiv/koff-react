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

export const updateProductInCard = createAsyncThunk(
  'cart/updateProductInCard',
  async (productData, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.accessKey;

    try {
      const response = await fetch(`${API_URL}/api/cart/products`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Не удалось обновить товар в корзине');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeProductFromCard = createAsyncThunk(
  'cart/removeProductFromCard',
  async (id, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.accessKey;

    try {
      const response = await fetch(`${API_URL}/api/cart/products/${id}`, {
        method: 'DELETE',
        headers: {
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
  deliveryPrice: 500,
  loadingFetch: false,
  loadingAdd: false,
  loadingUpdate: false,
  loadingRemove: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeDeliveryPrice: (state, action) => {
      state.deliveryPrice = action.payload;
    },
  },
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
      .addCase(updateProductInCard.pending, state => {
        state.loadingUpdate = true;
        state.error = null;
      })
      .addCase(updateProductInCard.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        state.goods = state.goods.map(item => {
          if (item.id === action.payload.productCart.productId) {
            item.quantity = action.payload.productCart.quantity;
          }
          return item;
        });
        state.totalPrice = state.goods.reduce((acc, item) => acc + item.price * item.quantity, 0);
        state.totalCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(updateProductInCard.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = action.error.message;
      })
      .addCase(removeProductFromCard.pending, state => {
        state.loadingAdd = true;
        state.error = null;
      })
      .addCase(removeProductFromCard.fulfilled, (state, action) => {
        state.loadingAdd = false;
        state.goods = state.goods.filter(item => item.id !== action.payload.id);
        state.totalPrice = state.goods.reduce((acc, item) => acc + item.price * item.quantity, 0);
        state.totalCount = action.payload.totalCount;
        state.error = null;
      })
      .addCase(removeProductFromCard.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.error.message;
      });
  },
});

export const { changeDeliveryPrice } = cartSlice.actions;
export default cartSlice.reducer;
