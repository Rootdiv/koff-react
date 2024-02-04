import { API_URL } from '@/const';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchAccessKey = createAsyncThunk('auth/fetchAccessKey', async () => {
  const response = await fetch(`${API_URL}/api/users/accessKey`);

  if (!response.ok) {
    throw new Error('Не удалось получить токен доступа!');
  }

  const data = await response.json();
  return data.accessKey;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessKey: localStorage.getItem('koff-react-accessKey') || null,
    loading: false,
    error: null,
  },
  reducers: {
    removeToken(state) {
      state.accessKey = null;
      localStorage.removeItem('koff-react-accessKey');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAccessKey.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccessKey.fulfilled, (state, action) => {
        state.accessKey = action.payload;
        localStorage.setItem('koff-react-accessKey', action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAccessKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeToken } = authSlice.actions;
export default authSlice.reducer;
