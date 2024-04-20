import React, { useEffect, useState } from 'react'
import ContainerCommon from '../../../components/ContainerCommon/ContainerCommon'
import ContentHeader from '../../../layouts/ContentHeader'
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedRows, searchBrands, setSelectedRowKeys, setSelectedRows, sortBrandsById } from '../../../redux/slices/brand';
import { Button, Flex, Input, Pagination, Select, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { MySpin } from '../../../components';
import FormCreateBrand from '../../../components/Brands/FormCreateBrand';
import FormUpdateBrand from '../../../components/Brands/FormUpdateBrand';
import FormDeleteBrand from '../../../components/Brands/FormDeleteBrand';
import MyModal from '../../../components/MyModal';

const Brand = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.brands.content);
  const status = useSelector((state) => state.brand.status);
  const error = useSelector((state) => state.brand.error);
  const totalPage = useSelector((state) => state.brand.brands.totalElements);
  const selectedRowKeys = useSelector(state => state.brand.selectedRowKeys);
  const selectedBrands = useSelector(state => state.brand.selectedBrands);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  

  useEffect(() => {
    dispatch(searchBrands({ searchTerm, pageNumber, pageSize }))
  }, [dispatch, pageNumber, pageSize]);


  const handleSortById = (value) => {
    const order = value;
    setPageNumber(1)
    dispatch(sortBrandsById({ order, pageNumber, pageSize }));
  }
  console.log(brands);
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    dispatch(setSelectedRows(selectedRows));
    dispatch(setSelectedRowKeys(newSelectedRowKeys));
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchBrands({ searchTerm, pageNumber, pageSize }));
    }
  };
  const handleAdd = () => {
    setActionModal("CREATE");
    setIsModalOpen(true);
  }

  const hanldeUpdate = () => {
    setActionModal("UPDATE")
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
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <Button >Previous</Button>;
    }
    if (type === 'next') {
      return <Button>Next</Button>;
    }
    return originalElement;
  };
  const handlePageClick = async (page) => {
    setPageNumber(page)
  }

  const columns = [
    {
      title: '#',
      render: (text, record, index) => ((pageNumber - 1) * pageSize) + index + 1,
    },
    {
      key: "maThuongHieu",
      title: 'Mã Thương Hiệu',
      dataIndex: 'maThuongHieu',
    },
    {
      key: "tenThuongHieu",
      title: 'Tên Thương Hiệu',
      dataIndex: 'tenThuongHieu',
    }
  ]
  return (
    <>
      <ContainerCommon title={"Quản lý Thương hiệu"}>
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
            <h4>Lọc Theo Mã</h4>
            <Select
              defaultValue="Lọc Theo Mã"
              style={{
                width: 150,
              }}
              onChange={handleSortById}
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
        </Flex>
        {
          status === 'loading' ? (
            <MySpin />
          ) :  (

            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={brands && brands.length > 0 ? brands.map((product, index) => ({ ...product, key: index })) : []}
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
            ('Thêm mới Thương hiệu')
            : actionModal === 'UPDATE' ?
              ('Cập nhật Thương hiệu') :
              ('Xóa Thương hiệu')}

          open={isModalOpen}
          onCancel={handleCancel}
          // isModalOpen={isModalOpen}
          centered
        >
          {actionModal === 'CREATE' ? (
            <FormCreateBrand
              searchTerm={searchTerm}
              pageNumber={pageNumber}
              pageSize={pageSize}
              handleCancel={handleCancel}
              isModalOpen={isModalOpen} />
          ) : actionModal === 'UPDATE' ? (
            <FormUpdateBrand
              searchTerm={searchTerm}
              pageNumber={pageNumber}
              pageSize={pageSize}
              handleCancel={handleCancel}
              isModalOpen={isModalOpen}
              selectedBrands={selectedBrands}
              actionModal={actionModal}
            />
          ) : (
            <FormDeleteBrand
              handleCancel={handleCancel}
              searchTerm={searchTerm}
              pageNumber={pageNumber}
              pageSize={pageSize}
              selectedBrands={selectedBrands}
            />
          )}

        </MyModal>
      </ContainerCommon>
    </>
  )
}

export default Brand
