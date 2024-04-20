import React, { useState, useEffect } from "react";
import { Form, Radio, Button, Modal, Input, DatePicker } from "antd";
import axios from "axios";
import { Alert, Space } from "antd";
import { useDispatch } from "react-redux";
import { onUserCreateModalClose } from "../../redux/slices/modalCloseSlice.jsx";
import bcrypt from 'bcryptjs';

const CreateUser = ({ open, handleClose, handleOpen }) => {
  const [userData, setUserData] = useState({
    trangThai: true,
    quyen: "Member",
    hoTen: "",
    ngaySinh: "",
    gioiTinh: "Male",
    soDienThoai: "",
    email: "",
    matKhau:"123456"
  });

  // Bảo mật---

  const MaHoaMatKhau = async () => {
    const plainTextPassword = userData.matKhau;
    const saltRounds = 10;
    
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
      // Cập nhật dữ liệu người dùng để sử dụng mật khẩu đã mã hóa
      setUserData(prevUserData => ({
        ...prevUserData,
        matKhau: hashedPassword
      }));
    } catch (error) {
      console.error('Error occurred while hashing password:', error);
    }
  }

//-----

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmClose, setConfirmClose] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onUserCreateModalClose(!open));
  }, [open, dispatch]);

  const handleCancel = () => {
    if (confirmClose) {
      handleClose();
    } else {
      setConfirmClose(true);
    }
  };

  const handleCancelConfirmAlert = () => {
    setConfirmClose(false);
  };

  const handleConfirmClose = () => {
    setConfirmClose(false);
    window.location.reload();
  };


  const handleInputChange = (name, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateUser = async () => {
    try {
      await MaHoaMatKhau();
      const preToken = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:8080/auth/refresh?token=${preToken}`);
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      const headers = {Authorization: `Bearer ${newToken}`};
      await axios.post(
        "http://localhost:8080/TaiKhoan",
        userData, { headers: headers }
      );
      setSuccessMessage("Tạo mới người dùng thành công!");
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      if (error.response) {
        // Nếu có response từ backend
        console.error("Error creating user:", error.response.data);
        setErrorMessage("Tạo mới người dùng thất bại!: \n" + error.response.data.detailMessage);
      } else if (error.request) {
        // Nếu request được gửi đi nhưng không nhận được response
        console.error("Error creating user: No response received from server");
        setErrorMessage("Tạo mới người dùng thất bại! \nKhông nhận được phản hồi từ máy chủ.");
      } else {
        // Nếu có lỗi trong quá trình thiết lập request
        console.error("Error creating user:", error.message);
        setErrorMessage("Tạo mới người dùng thất bại! \n" + error.message);
      }
    }
  };

  const handleSubmit = () => {
    handleCreateUser();
  };

  const validatePhoneNumber = (rule, value, callback) => {
    const phoneNumberRegex = /^[0-9]{10,13}$/;
    if (value && !phoneNumberRegex.test(value)) {
      callback("Vui lòng nhập đúng định dạng số điện thoại (từ 10-13 ký tự)!");
    } else {
      callback();
    }
  };

  return (
    <Modal
      width={650}
      // visible={open}
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Huỷ Bỏ
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          disabled={userData.hoTen === "" || userData.email === ""}
        >
          Tạo Người Dùng
        </Button>,
      ]}
    >
      <div style={{ marginTop: 30 }}>
        <h2>Tạo mới người dùng</h2>
        <br />
        {successMessage && (
          <Space
            direction="vertical"
            style={{
              width: "100%",
              padding: 50,
            }}
          >
            <Alert
              message="Thành công!"
              description={successMessage}
              type="success"
              showIcon
            />
          </Space>
        )}
        {errorMessage && (
          <Space
            direction="vertical"
            style={{
              width: "100%",
              padding: 50,
            }}
          >
            <Alert
              message="Lỗi"
              description={errorMessage}
              type="error"
              showIcon
            />
          </Space>
        )}
        {confirmClose && (
          <Modal
            width={500}
            // visible={open}
            open={confirmClose}
            onCancel={handleCancelConfirmAlert}
            footer={[
              <Button key="back" onClick={handleCancelConfirmAlert}>
                Tiếp tục tạo mới người dùng
              </Button>,
              <Button key="submit" type="primary" onClick={handleConfirmClose}>
                Xác nhận thoát
              </Button>,
            ]}
          >
            <h3>Bạn có chắc chắn muốn thoát?</h3>
          </Modal>
        )}

        <Form
          style={{ width: 650 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            hoTen: userData.hoTen,
            ngaySinh: userData.ngaySinh,
            soDienThoai: userData.soDienThoai,
            email: userData.email,
            gioiTinh: "Male",
            trangThai: true,
            quyen: "Member",
          }}
        >
          <Form.Item
            label="Họ Tên"
            name="hoTen"
            rules={[{ required: true, message: "Vui lòng nhập Họ Tên!" }]}
          >
            <Input
              placeholder="Họ Tên"
              value={userData.hoTen}
              onChange={(e) => handleInputChange("hoTen", e.target.value)}
              style={{ marginBottom: "16px" }}
            />
          </Form.Item>
          <Form.Item label="Ngày Sinh" name="ngaySinh">
            <DatePicker
              placeholder="Ngày Sinh"
              value={userData.ngaySinh}
              onChange={(date, dateString) =>
                handleInputChange("ngaySinh", dateString)
              }
              format="DD/MM/YYYY"
              style={{ marginBottom: "16px" }}
            />
          </Form.Item>
          <Form.Item
            label="Số Điện Thoại"
            name="soDienThoai"
            rules={[
              {
                validator: validatePhoneNumber,
              },
            ]}
          >
            <Input
              placeholder="Số Điện Thoại"
              value={userData.soDienThoai}
              onChange={(e) => handleInputChange("soDienThoai", e.target.value)}
              style={{ marginBottom: "16px" }}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Nhập vào email hợp lệ!",
              },
            ]}
          >
            <Input
              placeholder="Email"
              value={userData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              style={{ marginBottom: "16px" }}
            />
          </Form.Item>
          <Form.Item label="Giới tính" name="gioiTinh">
            <Radio.Group
              value={userData.gioiTinh}
              onChange={(e) => handleInputChange("gioiTinh", e.target.value)}
            >
              <Radio value="Male"> Male </Radio>
              <Radio value="Female"> Female </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Status" name="trangThai">
            <Radio.Group
              value={userData.trangThai}
              onChange={(e) => handleInputChange("trangThai", e.target.value)}
            >
              <Radio value= {true}> Active </Radio>
              <Radio value= {false}> NotActive </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Role" name="quyen">
            <Radio.Group
              value={userData.quyen}
              onChange={(e) => handleInputChange("quyen", e.target.value)}
            >
              <Radio value="CEO"> CEO </Radio>
              <Radio value="Admin"> Admin </Radio>
              <Radio value="Manager"> Manager </Radio>
              <Radio value="Seller"> Seller </Radio>
              <Radio value="Member"> Member </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateUser;
