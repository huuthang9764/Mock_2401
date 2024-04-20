import { Button, Col, Form, Input, Row, Table } from 'antd'
import React from 'react'
import { useState } from 'react';
import MyModal from '../../../components/MyModal';
import ContentHeader from '../../../layouts/ContentHeader';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const columns = [
  {
    key: "1",
    title: 'ID',
    dataIndex: 'MaTk',
  },
  {
    key: "2",
    title: 'HoTen',
    dataIndex: 'HoTen',
  },
  {
    key: "3",
    title: 'NgaySinh',
    dataIndex: 'NgaySinh',
  },
  {
    key: "4",
    title: 'GioiTinh',
    dataIndex: 'GioiTinh',
  },
  {
    key: "5",
    title: 'SoDienThoai',
    dataIndex: 'SoDienThoai',
  },
  {
    key: "6",
    title: 'Email',
    dataIndex: 'Email',
  },
  {
    key: "7",
    title: 'Status',
    dataIndex: 'Status',
  },
  {
    key: "8",
    title: "Actions",
    render: (record) => {
      return (
        <>
          <EditOutlined
            onClick={() => {
              
            }}
          />
          <DeleteOutlined
            onClick={() => {
             
            }}
            style={{ color: "red", marginLeft: 12 }}
          />
        </>
      );
    },
  },
];
const data = [
  {
    MaTk: 1,
    HoTen: "Admin",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "Active"
  },
  {
    MaTk: 2,
    HoTen: "Thắng",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "Active"
  },
  {
    MaTk: 3,
    HoTen: "Hải",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "NotActive"
  },
  {
    MaTk: 4,
    HoTen: "Hưng",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "NotActive"
  },
  {
    MaTk: 5,
    HoTen: "Dũng",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "NotActive"
  },
  {
    MaTk: 6,
    HoTen: "Toàn",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "NotActive"
  },
  {
    MaTk: 7,
    HoTen: "Admin3",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "NotActive"
  },
  {
    MaTk: 8,
    HoTen: "Hoàng Văn Chiến",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "Active"
  },
  {
    MaTk: 9,
    HoTen: "CEO",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "NotActive"
  },
  {
    MaTk: 10,
    HoTen: "Admin3",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "NotActive"
  },
  {
    MaTk: 11,
    HoTen: "Admin3",
    NgaySinh: "1990-01-01",
    GioiTinh: "Male",
    SoDienThoai: 123456,
    Email: "admin@gmail.com",
    Status: "Active"
  },
];

const Accounts = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acctionModal, setActionModal] = useState({});
  const [dataModel, setDataModal] = useState({});

  const handleAdd = () => {
    setActionModal("CREATE");
    setIsModalOpen(true);
  }

  const hanldeUpdate = (user) => {
    setActionModal("UPDATE");
    setDataModal(user);
    setIsModalOpen(true);
  }
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      <ContentHeader form={form} handleAdd={handleAdd} hanldeUpdate={hanldeUpdate} />
      <Table columns={columns} dataSource={data} />
      <MyModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} acctionModal={acctionModal} />
    </>
  )
}

export default Accounts
