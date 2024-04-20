import { createSlice } from '@reduxjs/toolkit';

const checkBoxSlice = createSlice({
    name: 'checkBox',
    initialState: {
        selected: [],
    },
    reducers: {
        toggleCheckBox: (state, action) => {
            state.selected = action.payload;
        },
    },
});

export const { toggleCheckBox } = checkBoxSlice.actions;
export default checkBoxSlice.reducer;
