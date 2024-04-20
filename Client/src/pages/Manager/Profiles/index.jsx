import { Avatar, Button, Menu, Col, DatePicker, Flex, Form, Input, Radio, Row, Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material';

import './style.scss'
import Header from '../../../components/Header/Header'
import { DashboardOutlined } from '@ant-design/icons';
import Sidebar from '../../../components/Sidebar/HomeSidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../../service/UserService';


const Profile = () => {
  let { id } = useParams();
  const [form] = Form.useForm();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    form.setFieldsValue({
    maTaiKhoan: userData.maTaiKhoan,
    hoTen: userData.hoTen,
    ngaySinh: userData.ngaySinh,
    gioiTinh: userData.gioiTinh,
    soDienThoai: userData.soDienThoai,
    email: userData.email,
    }) 
    fetchUserData()
  },[])
  const fetchUserData = async () => {
    try {
      // Gọi hàm getUserById để lấy thông tin người dùng dựa trên id
      const res = await getUserById(id);
      setUserData(res.data)
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw new Error('Failed to fetch user data');
    }
  };

  return (
    <Paper>
      <Header />
        <Sidebar />
      <Flex
        justify='center'
        align='center'
        vertical
        style={{ marginLeft: 250 }}
      >
        <Col style={{width: '100%'}}>
          <h4>Thông tin cá nhân</h4>
          <Form
            form={form}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            style={{ marginTop: 12, }} >
            <Form.Item
              label="Họ & Tên"
              name="hoTen"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="ngaySinh"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name="gioiTinh"
            >
              <Radio.Group>
                <Radio value="Nam"> Nam </Radio>
                <Radio value="pear"> Nữ </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="soDienThoai"
              label="Số điện thoại">
              <Input style={{
                width: '50%',
              }} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email">
              <Input style={{
                width: '50%',
              }} />
            </Form.Item>
            <Form.Item wrapperCol={{
              offset: 4,
              span: 14,
            }}>
              <Button type='primary'>Lưu thay đổi</Button>
            </Form.Item>

          </Form>

          {/* <Col flex="0 1 500px" className='pro-right'>
              <Flex gap="middle" align="center" vertical>
                <Avatar size={120} src="https://nguyenhuuthang.name.vn/image/avatar.jpg" />
                <Button style={{ background: "white", borderColor: "blue", color: "blue" }}>Chọn Ảnh</Button>
              </Flex>

            </Col> */}

        </Col>
        {/* <Footer style={{width:'100%'}} /> */}
      </Flex>
    </Paper>
  )
}

export default Profile
