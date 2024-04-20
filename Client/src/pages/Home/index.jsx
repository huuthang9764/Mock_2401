import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/HomeSidebar/Sidebar';
import Header from '../../components/Header/Header';
import BannerLargeSize from '../../components/Banner/LargeSize';
import ProductPreview from '../../components/ProductPreview';
import { Paper } from '@mui/material';
import productService from '../../service/manager/productService.js';
import Footer from '../../components/Footer/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../redux/slices/product.js';
import { Button, Empty, Flex, Pagination, } from 'antd';


const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products.content);
  const totalPage = useSelector((state) => state.product.products.totalElements);

  const [listProducts, setListProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [productsWithGiamGia, setProductsWithGiamGia] = useState([]);



  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const randomRating = () => {
    // const specialNumbers = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
    const specialNumbers = [2.0, 3.0, 3.5, 4.0, 4.5, 5.0];
    const randomIndex = Math.floor(Math.random() * specialNumbers.length);
    const randomNumber = specialNumbers[randomIndex];
    return randomNumber;
  }
  useEffect(() => {
    dispatch(searchProducts({ searchTerm, pageNumber, pageSize }));
  }, [dispatch, pageNumber, pageSize]);


  useEffect(() => {
    const updateProductsWithGiamGia = () => {
      const productsWithGiamGia = products && products.map(product => {
        const newGiamGia = Math.floor(Math.random() * 25) + 1;
        const rating = randomRating();
        return {
          ...product,
          giamGia: newGiamGia,
          rating: rating
        };
      });
      localStorage.setItem('productsWithGiamGia',JSON.stringify(productsWithGiamGia))
      setProductsWithGiamGia(productsWithGiamGia);
    }
    updateProductsWithGiamGia();
  }, [products])


  const handleSearchChange = (query) => {
    setSearchTerm(query);
  };
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchProducts({ searchTerm, pageNumber, pageSize }));
    }
  };

  const hanldeFindsProduct = () => {
    dispatch(searchProducts({ searchTerm, pageNumber, pageSize }));
  }
  const handlePageClick = async (page) => {
    setPageNumber(page)
  }
  return (
    <Paper>
      <Header onSearchChange={handleSearchChange} hanldeFindsProduct={hanldeFindsProduct} handleEnter={handleEnter} />
      {showSearchResults && (
        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: "950px", justifyContent: "center", textAlign: "center" }}>
          {searchResults.map((product, index) => (
            <ProductPreview key={index} productId={product.maSanPham} productName={product.tenSanPham} productDescription={product.moTaChiTiet} productPrice={product.gia} />
          ))}
        </div>
      )}
      <div style={{ display: showSearchResults ? 'none' : 'flex', flexDirection: 'row' }}>
        <Sidebar />
        <BannerLargeSize />
      </div>
      {!showSearchResults && (
        <Flex
          justify='center'
          align='center'
          vertical
          style={{ marginLeft: 250 }}>
          <Flex wrap='wrap' style={{ marginLeft: 50, maxWidth: "950px", marginBottom: '20px' }}>
            {productsWithGiamGia && productsWithGiamGia.length > 0 ? (
              productsWithGiamGia.map((product, index) => (
                <ProductPreview key={index} product={product} maSanPham={product.maSanPham} productsWithGiamGia={productsWithGiamGia} />
              ))
            ) : (
              <Empty />
            )}
          </Flex>
          {totalPage > 0 &&
            <Pagination
              total={totalPage}
              current={pageNumber}
              defaultPageSize={pageSize}
              onChange={handlePageClick}
              style={{ margin: '20px 0' }} />
          }
        </Flex>
      )}
      <Footer />
    </Paper>
  );
};

export default Home;