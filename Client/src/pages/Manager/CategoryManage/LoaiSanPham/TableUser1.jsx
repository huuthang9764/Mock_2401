import React, { useState, useEffect } from "react";
import { Table, Checkbox, Input, Button } from "antd";
import { fetchAllUser } from "../../../service/UserService";
import { SearchOutlined } from "@mui/icons-material";

const TableUser = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageSize: 5 });


  useEffect(() => {
    getUser();
  }, []);



  const getUser = async () => {
    try {
      const res = await fetchAllUser();
      if (res && res.data && res.data.length > 0) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
        />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["ascend", "descend"],
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['ascend', 'descend'],
        render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={pagination}
      onChange={(pagination) => setPagination(pagination)}
    />
  );
};

export default TableUser;
