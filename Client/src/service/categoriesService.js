import api from "./config/apiConfig";

const fetchCategories = async () => {
  try {
    // const token = getAccessToken();
    const response = await api.get(`/LoaiSanPham?sort=maLoaiSanPham,asc`);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('failed');
  }
};

const CategoryService = {
  fetchCategories
}
export default CategoryService;