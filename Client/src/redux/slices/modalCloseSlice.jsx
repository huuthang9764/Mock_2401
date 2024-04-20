import { createSlice } from '@reduxjs/toolkit';

const modalCloseSlice = createSlice({
    name: 'modalClose',
    initialState: {
        isUserDeleteModalClose: false,
        isUserUpdateModalClose: false,
        isUserCreateModalClose: false,
    },
    reducers: {
        onUserDeleteModalClose: (state, action) => {
            state.isUserDeleteModalClose = action.payload;
        },
        onUserUpdateModalClose: (state, action) => {
            state.isUserUpdateModalClose = action.payload;
        },
        onUserCreateModalClose: (state, action) => {
            state.isUserCreateModalClose = action.payload;
        },
    },
});

export const { onUserCreateModalClose, onUserDeleteModalClose, onUserUpdateModalClose } = modalCloseSlice.actions;
export default modalCloseSlice.reducer;
