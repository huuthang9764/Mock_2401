import { toast } from "react-toastify";
import { getAccessToken } from "../utils/helper";
import api from "./config/apiConfig";




const fetchBrands = async () => {
  try {
    const response = await api.get(`/ThuongHieu?sort=maThuongHieu,asc`);
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('failed');
  }
};

const searchBrands = async (searchTerm, pageNumber, pageSize) => {
  try {
    const response = await api.get(`/ThuongHieu?sort=maThuongHieu,asc&search=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`,);
    return response.data;
  } catch (error) {
    throw new Error('Failed to search Brands');
  }
};

const sortBrandsById = async (order, pageNumber, pageSize) => {
  try {
    const sortOption = order === 'asc' ? 'maThuongHieu,asc' : 'maThuongHieu,desc';
    const response = await api.get(`/ThuongHieu?sort=${sortOption}&pageNumber=${pageNumber}&pageSize=${pageSize}`, );
    return response.data;
  } catch (error) {
    throw new Error('Failed to sort Brands by id');
  }
};

const createBrand = async (data) => {
  try {
    const token = getAccessToken();
    const response = await api.post('/ThuongHieu', data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const createdProduct = response.data;
    return createdProduct;
  } catch (error) {
    throw new Error('Creating Brands failed');
  }
};


const updateBrand = async (id, data) => {
  try {
    const token = getAccessToken();
    const response = await api.patch(`/ThuongHieu/${id}`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Change Brands failed');
  }
};

const deleteBrand = async (id) => {
  try {
    const token = getAccessToken();
    await api.delete(`/ThuongHieu/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 'Brands deleted successfully';
  } catch (error) {
    throw new Error('Deleting Brands failed');
  }
};

const BrandsService = {
  fetchBrands,
  searchBrands,
  sortBrandsById,
  createBrand,
  updateBrand,
  deleteBrand
}
export default BrandsService;