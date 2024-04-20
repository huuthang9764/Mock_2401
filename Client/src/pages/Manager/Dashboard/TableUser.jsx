import React, { useState, useEffect } from "react";
import { Table, Checkbox, Input, Button, Space, Modal, message } from "antd";
import { getLoaiSanPham } from "../../../service/UserService";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ModelAddNew from "./ModelAddNew";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import ModalDeleteMany from "./ModalDeleteMany";
import { deburr } from "lodash";

const TableUser = () => {
  const [data, setData] = useState([]);

  const [pagination, setPagination] = useState({ pageSize: 5 });
  const [loading, setLoading] = useState(false);

  const [selectedRows, setSelectedRows] = useState({}); // State để lưu trữ các hàng được chọn

  const handleCheckboxChange = (record) => {
    const updatedSelectedRows = { ...selectedRows };
    updatedSelectedRows[record.key] = !updatedSelectedRows[record.key];
    setSelectedRows(updatedSelectedRows);
  };

  const isActionColumnActive = (record) => {
    return Object.values(selectedRows).some((value) => value === true);
  };
  // Xử lý filter
  // Filter state
  const [filterName, setFilterName] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    applyFilter();
  }, [filterName, data]);

  const applyFilter = () => {
    const filtered = data.filter((item) =>
      removeDiacritics(item.tenLoaiSanPham.toLowerCase()).includes(
        removeDiacritics(filterName.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };


  // Hàm loại bỏ dấu tự viết
  const removeDiacritics = (str) => {
    return deburr(str);
  };

  const handleInputChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleSearch = () => {
    applyFilter();
  };
  //Add new
  const [showModalAddNew, setShowModalAddNew] = useState(false);

  const updateTable = (item) => {
    setData([item, ...data]);
  };

  // Edit
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const handleEdit = (loaisanpham) => {
    setDataEdit(loaisanpham);
    setShowModalEdit(true);
  };

  //Delete
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const handleDelete = (loaisanpham) => {
    setShowModalDelete(true);
    setDataDelete(loaisanpham);
  };

  //Delete many
  const [showModalDeleteMany, setShowModalDeleteMany] = useState(false);
  const [dataDeleteMany, setDataDeleteMany] = useState([]);
  const clearSelectedCheckboxes = () => {
    setSelectedRows({});
  };
  const handleDeleteMany = () => {
    setShowModalDeleteMany(true);
    try {
      const selectedKeys = Object.keys(selectedRows).filter(
        (key) => selectedRows[key]
      );
      const maLoaiSanPhamList = selectedKeys.map(
        (key) => data[key].maLoaiSanPham
      );
      console.log("Selected IDs:", maLoaiSanPhamList);
      setDataDeleteMany(maLoaiSanPhamList);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const handleClose = () => {
    setShowModalAddNew(false);
    setShowModalEdit(false);
    setShowModalDelete(false);
    setShowModalDeleteMany(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await getLoaiSanPham();
      if (res && res.data && res.data.content) {
        setData(res.data.content);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: (
        <Checkbox
        // Add your checkbox properties here
        />
      ),
      dataIndex: "selected",
      render: (_, record) => (
        <Checkbox
          // Add your checkbox properties here
          checked={selectedRows[record.key]}
          onChange={() => handleCheckboxChange(record)}
        />
      ),
      width: 50,
    },
    {
      title: "ID",
      dataIndex: "maLoaiSanPham",
      key: "maLoaiSanPham",
      sorter: (a, b) => a.maLoaiSanPham - b.maLoaiSanPham,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Tên loại sản phẩm",
      dataIndex: "tenLoaiSanPham",
      key: "tenLoaiSanPham",
      sorter: (a, b) => a.tenLoaiSanPham.localeCompare(b.tenLoaiSanPham),
      sortDirections: ["ascend", "descend"],
      render: (text) => <a>{text}</a>,
      width: 500,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={
              (!selectedRows[record.key] && isActionColumnActive(record)) ||
              record.maLoaiSanPham === 1
            }
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            disabled={
              (!selectedRows[record.key] && isActionColumnActive(record)) ||
              record.maLoaiSanPham === 1
            }
          >
            Xóa
          </Button>
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm kiếm theo tên loại sản phẩm"
          value={filterName}
          onChange={handleInputChange}
          onPressEnter={handleSearch}
          style={{ width: 400 }}
          prefix={<SearchOutlined />}
          allowClear
        />
        <Button type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
        <Button
          style={{ marginRight: 10, marginLeft: 100 }}
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowModalAddNew(true)}
        >
          Thêm
        </Button>
        <Button danger icon={<DeleteOutlined />} onClick={handleDeleteMany}>
          Xóa
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData.map((item, index) => ({
          ...item,
          key: index,
        }))}
        pagination={pagination}
        onChange={(pagination) => setPagination(pagination)}
        loading={loading}
      />
      <ModelAddNew
        show={showModalAddNew}
        handleClose={handleClose}
        updateTable={updateTable}
      />
      <ModalEdit
        show={showModalEdit}
        handleClose={handleClose}
        dataEdit={dataEdit}
        getUser={getUser}
      />
      <ModalDelete
        show={showModalDelete}
        handleClose={handleClose}
        dataDelete={dataDelete}
        getUser={getUser}
      />
      <ModalDeleteMany
        show={showModalDeleteMany}
        handleClose={handleClose}
        dataDeleteMany={dataDeleteMany}
        getUser={getUser}
        clearSelectedCheckboxes={clearSelectedCheckboxes}
      />
    </div>
  );
};

export default TableUser;
