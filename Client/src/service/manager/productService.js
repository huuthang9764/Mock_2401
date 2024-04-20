// import { getAccessToken } from "../utils/helper";
import { getAccessToken } from "../../utils/helper";
import api from "../config/apiConfig2";


const fetchProducts = async (pageNumber, pageSize) => {
  try {
    // const token = getAccessToken();
    const response = await api.get(`/SanPham?sort=maSanPham,asc&pageNumber=${pageNumber}&pageSize=${pageSize}`);
    const ProData = response.data.content;
    return ProData;
  } catch (error) {
    throw new Error('failed');
  }
};
const fetchProductsHome = async (pageSize) => {
  try {
    // const token = getAccessToken();
    const response = await api.get(`/SanPham?sort=maSanPham,desc&pageSize=${pageSize}`);
    const ProData = response.data;
    return ProData;
  } catch (error) {
    throw new Error('failed');
  }
};

const getProductByID = async (id) => {
  try {
    const response = await api.get(`/SanPham/${id}`); // Thay đổi endpoint và cách truyền id nếu cần
    const productData = response.data;
    return productData;
  } catch (error) {
    throw new Error('Failed to get product by ID');
  }
};



const createProduct = async (data) => {
  try {
    const token = getAccessToken();
    const response = await api.post('/SanPham', data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const createdProduct = response.data;
    return createdProduct;
  } catch (error) {
    throw new Error('Creating product failed');
  }
};

const changeStatus = async (id, data) => {
  try {
    const token = getAccessToken();
    const response = await api.patch(`/SanPham/${id}`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Change Status product failed');
  }
};

const updateProduct = async (id, data) => {
  try {
    const token = getAccessToken();
    const response = await api.patch(`/SanPham/${id}`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Change Status product failed');
  }
};

const searchProducts = async (searchTerm, pageNumber, pageSize) => {
  try {
    // const token = getToken();
    const response = await api.get(`/SanPham?sort=maSanPham,asc&search=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`,);
    return response.data;
  } catch (error) {
    throw new Error('Failed to search products');
  }
};

const sortProductsByPrice = async (order, pageNumber, pageSize) => {
  try {
    // const token = getToken();
    console.log(order);
    const sortOption = order === 'asc' ? 'gia,asc' : 'gia,desc';
    const response = await api.get(`/SanPham?sort=${sortOption}&pageNumber=${pageNumber}&pageSize=${pageSize}`, );
    return response.data;
  } catch (error) {
    throw new Error('Failed to sort products by Price');
  }
};

const sortProductsById = async (order, pageNumber, pageSize) => {
  try {
    // const token = getToken();
    const sortOption = order === 'asc' ? 'id,asc' : 'id,desc';
    const response = await api.get(`/SanPham?sort=${sortOption}&pageNumber=${pageNumber}&pageSize=${pageSize}`, );
    return response.data;
  } catch (error) {
    throw new Error('Failed to sort products by id');
  }
};

const sortProductsByStatus = async (order, pageNumber, pageSize) => {
  try {
    // const token = getToken();
    const response = await api.get(`/SanPham?trangThai=${order}&pageNumber=${pageNumber}&pageSize=${pageSize}`, );
    return response.data;
  } catch (error) {
    throw new Error('Failed to sort products by Status');
  }
};

const sortProductsByIdCategory = async (order, pageNumber, pageSize) => {
  try {
    // const token = getToken();
    const response = await api.get(`/SanPham?maLoaiSanPham=${order}&pageNumber=${pageNumber}&pageSize=${pageSize}`, );
    return response.data;
  } catch (error) {
    throw new Error('Failed to sort products by id Category');
  }
};

const getProductById = async (id) => {
  try {
    // const token = getToken();
    const response = await api.get(`/SanPham/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Không lấy được sản phẩm');
  }
};

const getAllProduct = async (pageSize) => {
  try {
    // const token = getAccessToken();
    const response = await api.get(`/SanPham?sort=maSanPham,&pageSize=${pageSize}`);
    const ProData = response.data;
    return ProData;
  } catch (error) {
    throw new Error('failed');
  }
};

const fetchProductsCEO = async () => {
  try {
    // const token = getAccessToken();
    const response = await api.get(`/SanPham`);
    const ProData = response.data;
    return ProData;
  } catch (error) {
    throw new Error('failed');
  }
};

const ProductService = {
  fetchProducts,
  getProductByID,
  fetchProductsHome,
  createProduct,
  changeStatus,
  updateProduct,
  searchProducts,
  sortProductsByPrice,
  sortProductsById,
  sortProductsByStatus,
  sortProductsByIdCategory,
  getProductById,
  getAllProduct,
  fetchProductsCEO
}

export default ProductService;