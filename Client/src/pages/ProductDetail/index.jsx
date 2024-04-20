import { Row, Col, Input, Button, Flex, List, Image, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, getProductByID, selectGiamGia } from '../../redux/slices/product';
import { getIdUser } from '../../utils/helper';
import Footer from '../../components/Footer';
import { fetchCategories } from '../../redux/slices/categories';
import { fetchBrands } from '../../redux/slices/brand';
import { ProductPreview } from '../../components';
import Header from '../../components/Header/Header';
import { createCart } from '../../service/CartService';
import { toast } from 'react-toastify';


const ProductDetail = () => {
  let { state } = useLocation();
  const {
    maSanPham,
    tenSanPham,
    soLuot, rating,
    moTaChiTiet, gia, soLuongSanPham, giamGia, xuatXu, maLoaiSanPham, maThuongHieu, danhSachAnhMinhHoa } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories.content);
  const brands = useSelector((state) => state.brand.brands.content);

  const [listProducts, setListProducts] = useState([]);
  const [soLuong, setSoLuong] = useState(1);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [giaSauGiam, setGiaSauGiam] = useState(0);
  const [thanhTien, setThanhTien] = useState(0);

  const productsWithGiamGia = localStorage.getItem('productsWithGiamGia') ? JSON.parse(localStorage.getItem('productsWithGiamGia')) : []

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber: 1, pageSize: 11 }));
    dispatch(fetchCategories());
    dispatch(fetchBrands());

  }, [dispatch]);
  useEffect(() => {
    if (danhSachAnhMinhHoa && danhSachAnhMinhHoa.length > 0) {
      setSelectedImage(danhSachAnhMinhHoa[0].url);
    } else {
      setSelectedImage('MockProject/celit98tjoulh1d2xdku')
    }
  }, [danhSachAnhMinhHoa]);

  useEffect(() => {
    setGiaSauGiam(Math.floor(gia - (gia * giamGia / 100)))
  }, [giaSauGiam, giamGia, gia]);

  useEffect(() => {
    if (giaSauGiam !== undefined) {
      setThanhTien(giaSauGiam * soLuong);
    }
  }, [giaSauGiam, soLuong]);

  useEffect(() => {
    // Lọc ra danh sách sản phẩm khác khi danh sách sản phẩm đã được cập nhật
    if (productsWithGiamGia && productsWithGiamGia.length > 0) {
      const otherProducts = productsWithGiamGia.filter(product => product.maSanPham !== maSanPham);
      setListProducts(otherProducts);
    }
  }, [products, maSanPham]);


  const handleQuantityChange = (value) => {
    setSoLuong(value);
  };

  // Hàm xử lý khi người dùng tăng hoặc giảm số lượng
  const handleDecrease = () => {
    if (soLuong > 1) {
      setSoLuong(soLuong - 1);
    }
  };

  const handleIncrease = () => {
    // Kiểm tra nếu số lượng không vượt quá số lượng còn lại
    if (soLuong < soLuongSanPham) {
      setSoLuong(soLuong + 1);
    }
  };
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };


  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return '';
  };

  const findCategoryName = (maLoaiSanPham) => {
    const category = categories?.find(category => category.maLoaiSanPham === maLoaiSanPham);
    return category ? category.tenLoaiSanPham : '';
  };
  const findBrandName = (maThuongHieu) => {
    const brand = brands?.find(brand => brand.maThuongHieu === maThuongHieu);
    return brand ? brand.tenThuongHieu : '';
  }
  const handleAddToCart = async() => {
    const maTaiKhoan =  getIdUser();

    const body = {
      maTaiKhoan: maTaiKhoan,
      maSanPham: maSanPham,
      donGia: gia,
      soLuong: soLuong,
      thanhTien

    }
    await createCart(body).then(response => {
      toast.success("Thêm vào giỏ hàng thành công !", {
        position: "top-right"
      });
      navigate('/cart')
    })
  }
  return (
    <>
      <Header  />
      <Row style={{
        display: 'flex',
        padding: '20px 70px',
        backgroundColor: '#eee',

      }}>
        <Col span={7} style={{
          height: '500px',
          marginRight: '40px',
          padding: '20px 20px 0 20px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          position: 'sticky',
          top: 0,
        }} >
          <Flex justify='space-between' vertical>
            <Flex justify='center' align='center' >
              <Image
                width="100%"
                style={{ width: '362x', height: '390px', border: '1px solid #ccc', borderRadius: '10px' }}
                src={`http://res.cloudinary.com/djhoea2bo/image/upload/v1711546395/${selectedImage}`}
              />
            </Flex>
            <Flex justify='center' align='center' gap='large' style={{ marginTop: '10px' }}>
              {danhSachAnhMinhHoa.length === 0 ? (
                <Image
                  src={`http://res.cloudinary.com/djhoea2bo/image/upload/v1711546395/${selectedImage}`}
                  style={{
                    width: '60px', height: '60px',
                    border: selectedImageIndex !== null ? '1px solid blue' : 'none',
                  }}
                  preview={false}
                />
              ) : (
                <List
                  grid={{ gutter: 16 }}
                  dataSource={danhSachAnhMinhHoa}
                  renderItem={(item, index) => (
                    <List.Item
                      onClick={() => handleImageClick(item.url, index)}>
                      <Flex>
                        <Image
                          src={`http://res.cloudinary.com/djhoea2bo/image/upload/v1711546395/${item.url}`}
                          style={{
                            cursor: 'pointer', width: '60px', height: '60px',
                            border: selectedImageIndex === index ? '1px solid blue' : 'none',
                          }}
                          preview={false}
                        />
                      </Flex>
                    </List.Item>
                  )}
                />
              )}

            </Flex>
          </Flex>
        </Col>

        <Col span={8} style={{
          marginRight: '40px',
          padding: '20px 20px 0 20px',
          backgroundColor: '#fff',
          borderRadius: '10px',

        }}>
          <Flex
            justify='space-between'
            vertical='vertical'
            gap="middle"
            style={{
              padding: '20px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              borderRadius: '10px',

            }}>
            <h2>{tenSanPham}</h2>
            <Flex gap="middle">
              <Rate disabled allowHalf value={rating} />
              <strong>{rating}</strong>
            </Flex>
            <Flex>
              <p style={{ display: 'inline-block', marginRight: '8px' }}>
                {giaSauGiam !== undefined ? `${formatPrice(giaSauGiam)}đ` : ''}
              </p>
              <p style={{ display: 'inline-block', marginLeft: '8px' }}>{`-${giamGia}%`}</p>
            </Flex>
            <Flex vertical>
              <strong style={{
                display: 'inline-block',
                color: 'red',
                textDecoration: 'line-through',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '20px'

              }}>{`${formatPrice(gia)}đ`}</strong>
              <p>{soLuot}</p>
            </Flex>


          </Flex>
          <Flex className='info' style={{
            margin: '20px 0',
            padding: '20px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            borderRadius: '10px',
          }}>
            <Flex vertical style={{ marginTop: '20px', width: '100%' }}>
              <h3 style={{ width: '100%', paddingBottom: '8px', marginBottom: '20px' }}>Thông tin chi tiết</h3>
              <Flex
                style={{ width: '100%', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '20px' }}
                justify="space-between"

              >
                <div style={{ width: '50%' }}>Xuất xứ (Made in)</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{xuatXu}</div>
              </Flex>
              <Flex
                style={{ width: '100%', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '20px' }}
                justify='space-between'

              >
                <div style={{ width: '50%' }}>Loại Sản Phẩm</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{findCategoryName(maLoaiSanPham)}</div>
              </Flex>
              <Flex
                style={{ width: '100%', borderBottom: '1px solid #ddd', paddingBottom: '8px', marginBottom: '20px' }}
                justify='space-between'

              >
                <div style={{ width: '50%' }}>Thương hiệu</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{findBrandName(maThuongHieu)}</div>
              </Flex>
              <Flex
                style={{ width: '100%' }}
                justify='space-between'

              >
                <div style={{ width: '50%' }}>Mô Tả Chi Tiết</div>
                <div style={{ width: '50%', textAlign: 'right' }}>{moTaChiTiet}</div>
              </Flex>
            </Flex>
          </Flex>

        </Col>

        <Col span={7} >
          <Flex justify='space-between' vertical>
            <div style={{
              padding: '20px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              borderRadius: '10px',
              marginLeft: '30px',
              position: 'sticky',
              top: 0,
            }}>
              <h3>Số lượng</h3>
              <Row gutter={8} style={{ marginTop: '20px' }}>
                <Col span={4}>
                  <Button onClick={handleDecrease}>-</Button>
                </Col>
                <Col span={5}>
                  <Input
                    type="number"
                    min={1}
                    max={soLuongSanPham}
                    value={soLuong}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  />
                </Col>
                <Col span={4}>
                  <Button onClick={handleIncrease}>+</Button>
                </Col>
              </Row>
              <div style={{ marginTop: '20px' }}>
                <Flex vertical='vertical'>
                  <h4>
                    Tạm tính:
                  </h4>
                  <h3>{thanhTien !== undefined ? `${formatPrice(thanhTien)}đ` : ''}</h3>
                </Flex>
                <Button type="primary" style={{ marginTop: '10px' }} onClick={handleAddToCart}>Thêm Vào giỏ Hàng</Button>
              </div>
            </div>
          </Flex>

        </Col>
      </Row>
      <Row style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
  <Col span={24}>
    <Flex>
      {listProducts.map((product, index) => (
        <ProductPreview key={index} product={product} maSanPham={product.maSanPham} />
      ))}
    </Flex>
  </Col>
</Row>

      <Footer />
    </>
  )
}

export default ProductDetail
