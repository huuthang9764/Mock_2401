import axiosClient from "../config/apiConfig3";

const endpoint = "/DonHang";

class OrderAPI {
  static getAllOrder = async (params = {}) => {
    return await axiosClient.get(endpoint, { params });
  };

  static getOrderDetails = async (orderId) => {
    return await axiosClient.get(`${endpoint}/chiTietDonHang/${orderId}`);
  };

  static updateOrderStatus = async (orderId, status) => {
    return await axiosClient.patch(`${endpoint}/${orderId}`, { trangThai: status });
  };
}

export default OrderAPI;