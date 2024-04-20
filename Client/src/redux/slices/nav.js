import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dopen: true,
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    updateOpen: (state, action) => {
      state.dopen = action.payload;
    },
  },
});

export const { updateOpen } = navSlice.actions;

export const selectDopen = (state) => state.nav.dopen;

// const { reducer } = navSlice;
export default navSlice.reducer;
