import axios from "../config/apiConfig";

const getLoaiSanPham = () => {
  return axios.get("/LoaiSanPham");
};

const postLoaiSanPham = (tenLoaiSanPham) => {
  return axios.post("/LoaiSanPham", { tenLoaiSanPham });
};

const updateLoaiSanPham = (maLoaiSanPham, tenLoaiSanPham) => {
  return axios.patch(`/LoaiSanPham/${maLoaiSanPham}`, {
    tenLoaiSanPham,
  });
};

const deleteLoaiSanPham = (maLoaiSanPham) => {
  return axios.delete(`/LoaiSanPham/${maLoaiSanPham}`);
};

const deleteManyLoaiSanPham = (danhSachMaLoaiSanPham) => {
  return axios.delete(`/LoaiSanPham/deleteMany/${danhSachMaLoaiSanPham.join(",")}`);
};

export {
  getLoaiSanPham,
  postLoaiSanPham,
  updateLoaiSanPham,
  deleteLoaiSanPham,
  deleteManyLoaiSanPham
};