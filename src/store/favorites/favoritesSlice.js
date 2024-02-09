import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoritesList: JSON.parse(localStorage.getItem('koff-react-favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favoritesList.push(action.payload);
      localStorage.setItem('koff-react-favorites', JSON.stringify(state.favoritesList));
    },
    removeFromFavorites: (state, action) => {
      state.favoritesList = state.favoritesList.filter(id => id !== action.payload);
      localStorage.setItem('koff-react-favorites', JSON.stringify(state.favoritesList));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
