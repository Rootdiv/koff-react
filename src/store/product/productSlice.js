import { API_URL } from '@/const';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProduct = createAsyncThunk('product/fetchProduct', async (id, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.accessKey;
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok || isNaN(id) || response.status === 404) {
    if (response.status === 401) {
      return thunkAPI.rejectWithValue({
        status: response.status,
        error: 'Не удалось загрузить товар!',
      });
    }
    throw new Error('Не удалось загрузить товар!');
  }

  return response.json();
});

const initialState = {
  data: {},
  loading: false,
  error: null,
};

const goodsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProduct.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default goodsSlice.reducer;
