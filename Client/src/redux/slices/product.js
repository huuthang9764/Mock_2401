import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../service/manager/productService";



const initialState = {
  products: [],
  giamGia: 0,
  filteredProducts: [],
  selectedRowKeys: [],
  selectedProducts: [],
  isLoading: false,
  errorMessage: '',
}

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({pageNumber, pageSize}) => {
    const response = await ProductService.fetchProducts(pageNumber, pageSize);
    return response;
  }
);

export const getProductByID = createAsyncThunk(
  "product/getProductByID",
  async (id) => {
    const response = await ProductService.getProductByID(id);
    return response;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async ({data}) => {
    const response = await ProductService.createProduct(data);
    return response;
  }
);

export const changeStatus = createAsyncThunk(
  "product/changeStatus",
  async ({ id, data }) => {
    const response = await ProductService.changeStatus(id, data);
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }) => {
    const response = await ProductService.updateProduct(id, data);
    return response;
  }
);
export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async ({ searchTerm, pageNumber, pageSize }) => {
    const response = await ProductService.searchProducts(searchTerm, pageNumber, pageSize);
    return response;
  }
);
export const sortProducts = createAsyncThunk(
  "product/sortProducts",
  async ({ order, pageNumber, pageSize }) => {
    const response = await ProductService.sortProductsByPrice(order, pageNumber, pageSize);
    return response;
  }
);

export const sortProductsById = createAsyncThunk(
  "product/sortProductId",
  async ({ order, pageNumber, pageSize }) => {
    const response = await ProductService.sortProductsById(order, pageNumber, pageSize);
    return response;
  }
);
export const sortProductsByIdCategory = createAsyncThunk(
  "product/sortProductIdCategory",
  async ({ order, pageNumber, pageSize }) => {
    const response = await ProductService.sortProductsByIdCategory(order, pageNumber, pageSize);
    return response;
  }
);

export const sortProductsByStatus = createAsyncThunk(
  "product/sortProductsByStatus",
  async ({ order, pageNumber, pageSize }) => {
    const response = await ProductService.sortProductsByStatus(order, pageNumber, pageSize);
    return response;
  }
);

const productSlice = createSlice({
  name: "product",
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
    setGiamGia: (state, action) => {
      state.giamGia = action.payload;
    },
    logout: (state) => {
      state.products = null;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProductByID.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductByID.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(getProductByID.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(changeStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changeStatus.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.status = 'succeeded';
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sortProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sortProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(sortProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sortProductsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sortProductsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(sortProductsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sortProductsByIdCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sortProductsByIdCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(sortProductsByIdCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sortProductsByStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sortProductsByStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(sortProductsByStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
const { reducer } = productSlice;
export default reducer;

export const { clearSelectedRows } = productSlice.actions;
export const { setSelectedRowKeys } = productSlice.actions;
export const { setSelectedRows } = productSlice.actions;
export const { setGiamGia } = productSlice.actions;

export const selectGiamGia = (state) => state.product.giamGia;