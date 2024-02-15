import { API_URL } from '@/const';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchOrder = createAsyncThunk('order/fetchOrder', async (orderId, { getState, rejectWithValue }) => {
  const state = getState();
  const token = state.auth.accessKey;

  try {
    const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok || response.status === 404) {
      if (response.status === 404) {
        return rejectWithValue({
          status: response.status,
          error: await response.json(),
        });
      }
      throw new Error('Ошибка при получении данных заказа!');
    }

    return response.json();
  } catch (error) {
    return rejectWithValue({ error: { message: error.message } });
  }
});

const initialState = {
  orderData: {},
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: state => {
      state.orderData = {};
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.message;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
