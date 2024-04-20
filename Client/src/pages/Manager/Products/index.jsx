import React, { useEffect, useState } from 'react'
import ContentHeader from '../../../layouts/ContentHeader'
import { toast, ToastContainer } from 'react-toastify';
import { Button, Flex, Input, Pagination, Select, Space, Table, Spin } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import MyModal from '../../../components/MyModal';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, clearSelectedRows, searchProducts, setSelectedRowKeys, setSelectedRows, sortProducts, sortProductsByIdCategory, sortProductsByStatus } from '../../../redux/slices/product';
import { unwrapResult } from '@reduxjs/toolkit';
import { FormChangeStatusAndDelete, FormCreate, FormUpdate, MySpin } from '../../../components';
import "react-toastify/dist/ReactToastify.css";
import './style.scss'
import { fetchCategories } from '../../../redux/slices/categories';
import { fetchBrands } from '../../../redux/slices/brand';
import ContainerCommon from "./../../../components/ContainerCommon/ContainerCommon";


const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products.content);
  const categories = useSelector((state) => state.category.categories.content);
  const brands = useSelector((state) => state.brand.brands.content);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const totalPage = useSelector((state) => state.product.products.totalElements);
  const selectedRowKeys = useSelector(state => state.product.selectedRowKeys);
  const selectedProducts = useSelector(state => state.product.selectedProducts);
  const [productTypes, setProductTypes] = useState([]);
  const [productBrand, setProductBrand] = useState([]);




  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState({});



  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);


  useEffect(() => {
    dispatch(searchProducts({ searchTerm, pageNumber, pageSize }));
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch, pageNumber, pageSize]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setProductTypes(
        categories.map((item) => ({
          value: item.maLoaiSanPham,
          label: item.tenLoaiSanPham
        }))
      );
    } else {
      setProductTypes([]);
    }
  }, [categories])

  useEffect(() => {
    if (brands && brands.length > 0) {
      setProductBrand(
        brands.map((item) => ({
          value: item.maThuongHieu,
          label: item.tenThuongHieu
        }))
      );
    } else {
      setProductBrand([]);
    }
  }, [brands])


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeByPrice = (value) => {
    const order = value;
    setPageNumber(1)
    dispatch(sortProducts({ order, pageNumber: 1, pageSize }));
  };

  const handleChangeCategory = (value) => {
    const order = value;
    setPageNumber(1)
    dispatch(sortProductsByIdCategory({ order, pageNumber: 1, pageSize }));
  }
  const handleFilterByStatus = (value) => {
    const order = value;
    setPageNumber(1)
    dispatch(sortProductsByStatus({ order, pageNumber: 1, pageSize }));
  }
  const handleChangeStatus = () => {
    const productState = {
      trangThai: !selectedProducts[0].trangThai,
    }
    dispatch(changeStatus({ id: selectedProducts[0].maSanPham, data: productState })).then(unwrapResult)
      .then(response => {
        toast.success("Đổi trạng thái sản phẩm thành công !", {
          position: "top-right"
        });
        // setPageNumber(1)
        dispatch(clearSelectedRows());
        dispatch(searchProducts({ searchTerm, pageNumber, pageSize }));
        setIsModalOpen(false);
      }).catch(error => {
        toast.error("Đổi trạng thái sản phẩm không thành công!", {
          position: "top-right"
        });
      })
  }


  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    dispatch(setSelectedRows(selectedRows));
    dispatch(setSelectedRowKeys(newSelectedRowKeys));
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchProducts({ searchTerm, pageNumber, pageSize }));
    }
  };

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <Button >Previous</Button>;
    }
    if (type === 'next') {
      return <Button>Next</Button>;
    }
    return originalElement;
  };
  const handleAdd = () => {
    setActionModal("CREATE");
    setIsModalOpen(true);
  }

  const hanldeUpdate = () => {
    setActionModal("UPDATE");

    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(clearSelectedRows());

  };
  const hanldeDelete = () => {
    setActionModal("DELETE");
    setIsModalOpen(true);

  }
  const handlePageClick = async (page) => {
    setPageNumber(page)
  }

  const findCategoryName = (maLoaiSanPham) => {
    const category = categories?.find(category => category.maLoaiSanPham === maLoaiSanPham);
    return category ? category.tenLoaiSanPham : '';
  };

  const findBrandName = (maThuongHieu) => {
    const brand = brands?.find(brand => brand.maThuongHieu === maThuongHieu);
    return brand ? brand.tenThuongHieu : '';
  }

  const columns = [
    {
      title: '#',
      render: (text, record, index) => ((pageNumber - 1) * pageSize) + index + 1,
    },
    {
      key: 'danhSachAnhMinhHoa',
      title: 'Thumbnail',
      dataIndex: 'danhSachAnhMinhHoa',
      render: danhSachAnhMinhHoa => (
        danhSachAnhMinhHoa && danhSachAnhMinhHoa.length > 0 ? (
          <img
            src={`http://res.cloudinary.com/djhoea2bo/image/upload/v1711546395/${danhSachAnhMinhHoa[0].url}`}
            alt="Ảnh"
            style={{ width: '50px', height: '50px' }}
          />
        ) : null
      ),


    },
    {
      key: "tenSanPham",
      title: 'Tên Sản Phẩm',
      dataIndex: 'tenSanPham',
    },
    {
      key: "xuatXu",
      title: 'Xuất Xứ',
      dataIndex: 'xuatXu',
    },
    {
      key: "gia",
      title: 'Giá',
      dataIndex: 'gia',
    },
    {
      key: "soLuongSanPham",
      title: 'Tồn Kho',
      dataIndex: 'soLuongSanPham',
    },
    {
      key: "maThuongHieu",
      title: "Thương Hiệu",
      dataIndex: 'maThuongHieu',
      render: maThuongHieu => findBrandName(maThuongHieu),
    },
    {
      key: "maLoaiSanPham",
      title: 'Loại Sản Phẩm',
      dataIndex: 'maLoaiSanPham',
      render: maLoaiSanPham => findCategoryName(maLoaiSanPham),
    },
    {
      key: "trangThai",
      title: 'Trạng Thái',
      dataIndex: 'trangThai',
      render: trangThai => (
        <Space>
          {trangThai ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
          {trangThai ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
        </Space>
      ),
    },
  ];

  return (
    <>
      <ContainerCommon title={"Quản lý sản phẩm"}>
        <ContentHeader selectedRowKeys={selectedRowKeys} handleAdd={handleAdd} hanldeUpdate={hanldeUpdate} hanldeDelete={hanldeDelete} />
        <Flex gap="large" className='header-table'>
          <div className='btn-filter'>
            <h4>Tìm Kiếm Sản Phẩm</h4>
            <Space direction="vertical">
              <Input
                placeholder="Enter your username"
                prefix={<SearchOutlined />}
                onPressEnter={handleEnter}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Space>
          </div>
          <div className='btn-filter'>
            <h4>Lọc Theo Giá</h4>
            <Select
              defaultValue="Lọc Theo Giá"
              style={{
                width: 150,
              }}
              onChange={handleChangeByPrice}
              options={[
                {
                  value: 'asc',
                  label: 'Tăng Dần',
                },
                {
                  value: 'desc',
                  label: 'Giảm Dần',
                }
              ]}
            />
          </div>
          <div className='btn-filter'>
            <h4>Lọc Loại Sản Phẩm</h4>
            <Select
              defaultValue={"Loại Sản Phẩm"}
              style={{
                width: 150,
              }}
              onChange={handleChangeCategory}
              options={productTypes}
            />
          </div>
          <div className='btn-filter'>
            <h4>Trạng Thái</h4>
            <Select
              defaultValue="Chọn trạng thái"
              style={{
                width: 150,
              }}
              onChange={handleFilterByStatus}
              options={[
                {
                  value: true,
                  label: 'Đã kích hoạt',
                },
                {
                  value: false,
                  label: 'Chưa kích hoạt',
                }
              ]}
            />
          </div>

        </Flex>
        {
          status === 'loading' ? (
            <MySpin />
          ) : status == 'failed' ? (
            <div>Error: {error}</div>
          ) : (

            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={products && products.length > 0 ? products.map((product, index) => ({ ...product, key: index })) : []}
              pagination={false}

            />
          )
        }
        {totalPage > 0 &&
          <Pagination
            total={totalPage}
            current={pageNumber}
            defaultPageSize={pageSize}
            itemRender={itemRender}
            onChange={handlePageClick}
            className='table-pagi' />
        }
        <MyModal
          title={actionModal === 'CREATE' ?
            ('Thêm mới sản phẩm')
            : actionModal === 'UPDATE' ?
              ('Cập nhật sản phẩm') :
              ('Xóa Sản Phẩm')}

          open={isModalOpen}
          onCancel={handleCancel}
          // isModalOpen={isModalOpen}
          centered
        >
          {actionModal === 'CREATE' ? (
            <FormCreate
              searchTerm={searchTerm}
              pageNumber={pageNumber}
              pageSize={pageSize}
              handleCancel={handleCancel}
              isModalOpen={isModalOpen} />
          ) : actionModal === 'UPDATE' ? (
            <FormUpdate
              searchTerm={searchTerm}
              pageNumber={pageNumber}
              pageSize={pageSize}
              handleCancel={handleCancel}
              isModalOpen={isModalOpen}
              selectedProducts={selectedProducts}
              actionModal={actionModal}
            />
          ) : (
            <FormChangeStatusAndDelete
              handleCancel={handleCancel}
              selectedProducts={selectedProducts}
              handleChangeStatus={handleChangeStatus}
            />
          )}

        </MyModal>
        <ToastContainer />
      </ContainerCommon>
    </>
  )
}

export default Product