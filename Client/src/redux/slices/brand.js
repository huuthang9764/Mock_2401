import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BrandsService from "../../service/brandService";


  
const initialState = {
  brands: [],
  isLoading: false,
  selectedRowKeys: [],
  selectedBrands: [],
  errorMessage: [],
}
export const fetchBrands = createAsyncThunk(
  "brand/fetchBrands",
  async () => {
    const response = await BrandsService.fetchBrands();
    return response;
  }
);

export const searchBrands = createAsyncThunk(
  "brand/searchBrands",
  async ({ searchTerm, pageNumber, pageSize }) => {
    const response = await BrandsService.searchBrands(searchTerm, pageNumber, pageSize);
    return response;
  }
);
export const sortBrandsById = createAsyncThunk(
  "brand/sortBrandsById",
  async ({ order, pageNumber, pageSize }) => {
    const response = await BrandsService.sortBrandsById(order, pageNumber, pageSize);
    return response;
  }
);

export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async ({data}) => {
    const response = await BrandsService.createBrand(data);
    return response;
  }
);


export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async ({ id, data }) => {
    const response = await BrandsService.updateBrand(id, data);
    return response;
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async ({id}) => {
    await BrandsService.deleteBrand(id);
    return id; // Trả về brandId sau khi đã xóa
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setSelectedRowKeys(state, action) {
      state.selectedRowKeys = action.payload;
    },
    setSelectedRows(state, action) {
      state.selectedBrands = action.payload;
    },
    clearSelectedRows(state) {
      state.selectedRows = [];
      state.selectedRowKeys = [];
    },
    logout: (state) => {
      state.brands = null;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.errorMessage = action.payload;
      })
      .addCase(searchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(searchBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sortBrandsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sortBrandsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(sortBrandsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBrand.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(updateBrand.fulfilled, (state) => {
        state.isLoading = false;
        state.status = 'succeeded';
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBrand.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteBrand.rejected, (state, error) => {
        state.status = 'failed';
        state.errorMessage = error;
      })
  },
});
const { reducer } = brandSlice;
export default reducer;

export const { clearSelectedRows } = brandSlice.actions;
export const { setSelectedRowKeys } = brandSlice.actions;
export const { setSelectedRows } = brandSlice.actions;
