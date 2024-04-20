import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light', // Chế độ mặc định
  palette: {
    primary: {
      main: '#007bff',
    },
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme(state, action) {
      state.palette = action.payload.palette;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
