import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeReducer';
import productReducer from './slices/product';
import categoryReducer from './slices/categories';
import brandReducer from './slices/brand'
import navReducer from './slices/nav';
import checkBoxReducer from './slices/checkBoxSlice';
import modalCloseReducer from './slices/modalCloseSlice';
import userLoginInfoReducer from "./userLoginInfo.jsx";
import chartFilterDonHangSliceReducer from "./slices/chartFilterDonHangSlice.jsx";
import chartFilterDoanhThuSliceReducer from "./slices/chartFilterDoanhThuSlice.jsx";
import chartFilterNguoiDungMoiSliceReducer from "./slices/chartFilterNguoiDungMoiSlice.jsx";

const rootReducer = {
  theme: themeReducer,
  product: productReducer,
  category: categoryReducer,
  brand:brandReducer,
  nav: navReducer,
  tableCheckBox: checkBoxReducer,
  modalClose: modalCloseReducer,
  chartFilterDonHang: chartFilterDonHangSliceReducer,
  chartFilterDoanhThu: chartFilterDoanhThuSliceReducer,
  chartFilterNguoiDungMoi: chartFilterNguoiDungMoiSliceReducer,
  userLoginInfo: userLoginInfoReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;