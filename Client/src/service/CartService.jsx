import { getAccessToken } from "../utils/helper";
import axios from "./config/apiConfig";

const UserId = sessionStorage.getItem("savedUserId") || localStorage.getItem("savedUserId")


const createCart = async (data) => {
  try {
    const token = getAccessToken();
    const response = await axios.post('/GioHang', data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const createCart = response.data;
    return createCart;
  } catch (error) {
    throw new Error('Creating Cart failed');
  }
};
const getDeliveryMethods = () => {
    return axios.get("/DichVuVanChuyen")
}
const getDataTable = () => {
    return axios.get(`/GioHang/${UserId}`)
}
const getDiaChi = (maDiaChi) => {
    return axios.get(`/Diachi/${maDiaChi}`)
}

const deleteCartItem = (maSanPham) => {
    return axios.delete(`GioHang/${UserId}/${maSanPham}`)
}
const getPaymentMethods = () => {
    return axios.get("/PhuongThucThanhToan")
}
export  {getDeliveryMethods, getPaymentMethods, getDataTable, deleteCartItem, getDiaChi,createCart}