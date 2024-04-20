import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../../service/categoriesService";

  
const initialState = {
  categories: [],
  filteredCategories: [],
  selectedRowKeys: [],
  selectedCategories: [],
  isLoading: false,
  errorMessage: '',
}
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await CategoryService.fetchCategories();
    return response;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedRowKeys(state, action) {
      state.selectedRowKeys = action.payload;
    },
    setSelectedRows(state, action) {
      state.selectedProducts = action.payload;
    },
    clearSelectedRows(state) {
      state.selectedRows = [];
      state.selectedRowKeys = [];
    },
    logout: (state) => {
      state.products = null;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});
const { reducer } = categorySlice;
export default reducer;


export const { clearSelectedRows } = categorySlice.actions;
export const { setSelectedRowKeys } = categorySlice.actions;
export const { setSelectedRows } = categorySlice.actions;