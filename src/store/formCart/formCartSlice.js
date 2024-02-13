import { API_URL } from '@/const';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  success: false,
  orderId: null,
};

export const submitCartForm = createAsyncThunk(
  'fromCart/submitCartForm',
  async (fromData, { getState, rejectWithValue }) => {
    const state = getState();
    const token = state.auth.accessKey;

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fromData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке данных заказа');
      }
      const responseData = await response.json();
      return responseData.orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const formCartSlice = createSlice({
  name: 'fromCart',
  initialState,
  reducers: {
    clearFormCart: state => {
      state.success = false;
      state.orderId = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitCartForm.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitCartForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderId = action.payload;
        state.error = null;
      })
      .addCase(submitCartForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.message.error;
      });
  },
});

export const { clearFormCart } = formCartSlice.actions;
export default formCartSlice.reducer;
