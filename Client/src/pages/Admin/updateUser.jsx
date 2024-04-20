import React, { useState, useEffect } from 'react';
import { Form, Radio, Button, Modal, Input, DatePicker } from 'antd';
import axios from 'axios';
import { Alert, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { onUserUpdateModalClose } from "../../redux/slices/modalCloseSlice.jsx";

const UpdateUser = ({ open, handleClose, handleOpen }) => {
    const [userData, setUserData] = useState({
        trangThai: true,
        quyen: "Member",
        hoTen: "",
        ngaySinh: "",
        gioiTinh: "Male",
        soDienThoai: "",
        email: "",
        matKhau: "123456"
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmClose, setConfirmClose] = useState(false);

    const rowId = useSelector((state) => state.tableCheckBox.selected);
    useEffect(() => {
    }, [rowId]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(onUserUpdateModalClose(!open));
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

    useEffect(() => {
        const fetchUserData = async () => {
            if (rowId && open) {
                try {
                    const response = await axios.get(`http://localhost:8080/TaiKhoan/${rowId}`);
                    setUserData(response.data);
                } catch (error) {
                    console.error('Error fetching user information:', error);
                }
            }
        };
        fetchUserData();
    }, [rowId, open]);


    const handleUpdateUser = async () => {
        try {
          const preToken = localStorage.getItem('token');
          const response = await axios.post(`http://localhost:8080/auth/refresh?token=${preToken}`);
          const newToken = response.data.token;
          localStorage.setItem('token', newToken);
          const headers = {Authorization: `Bearer ${newToken}`};
          await axios.patch(
              `http://localhost:8080/TaiKhoan/${rowId}`,
              userData, { headers: headers }
          );
            setSuccessMessage('Cập nhật thông tin người dùng thành công!');
            setTimeout(() => {
                handleClose();
            }, 1000);
        } catch (error) {
            if (error.response) {
                // Nếu có response từ backend
                console.error("Error creating user:", error.response.data);
                setErrorMessage("Cập nhật thông tin người dùng thất bại!: \n" + error.response.data.detailMessage);
            } else if (error.request) {
                // Nếu request được gửi đi nhưng không nhận được response
                console.error("Error creating user: No response received from server");
                setErrorMessage("Cập nhật thông tin người dùng thất bại! \nKhông nhận được phản hồi từ máy chủ.");
            } else {
                // Nếu có lỗi trong quá trình thiết lập request
                console.error("Error creating user:", error.message);
                setErrorMessage("Cập nhật thông tin người dùng thất bại! \n" + error.message);
            }
        }
    };

    const handleSubmit = () => {
        handleUpdateUser();
    };

    const validatePhoneNumber = (rule, value, callback) => {
        const phoneNumberRegex = /^[0-9]{10,13}$/;
        if (value && !phoneNumberRegex.test(value)) {
            callback('Vui lòng nhập đúng định dạng số điện thoại (từ 10-13 ký tự)!');
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
                    Update
                </Button>,
            ]}
        >
            <div style={{ marginTop: 30 }}>
                <h2>Sửa thông tin người dùng</h2>
                <br />
                {successMessage && (
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                            padding: 50
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
                            width: '100%',
                            padding: 50
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
                        open={open}
                        onCancel={handleCancelConfirmAlert}
                        footer={[
                            <Button key="back" onClick={handleCancelConfirmAlert}>
                                Tiếp tục sửa thông tin người dùng
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
                    style={{ width: 600 }}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        hoTen: userData.hoTen,
                        ngaySinh: userData.ngaySinh,
                        soDienThoai: userData.soDienThoai,
                        email: userData.email,
                    }}
                >
                    <Form.Item label="Họ Tên" name="hoTen" rules={[{ required: true, message: 'Vui lòng nhập Họ Tên!' }]}>
                        <Input
                            placeholder={userData.hoTen}
                            value={userData.hoTen}
                            onChange={(e) => handleInputChange('hoTen', e.target.value)}
                            style={{ marginBottom: '16px' }}
                        />
                    </Form.Item>
                    <Form.Item label="Ngày Sinh" name="ngaySinh">
                        <DatePicker
                            placeholder={userData.ngaySinh}
                            value={userData.ngaySinh}
                            onChange={(date, dateString) =>
                                handleInputChange('ngaySinh', dateString)
                            }
                            style={{ marginBottom: '16px' }}
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
                            placeholder={userData.soDienThoai}
                            value={userData.soDienThoai}
                            onChange={(e) =>
                                handleInputChange('soDienThoai', e.target.value)
                            }
                            style={{ marginBottom: '16px' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Nhập vào email hợp lệ!',
                            },
                        ]}
                    >
                        <Input
                            placeholder={userData.email}
                            value={userData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            style={{ marginBottom: '16px' }}
                        />
                    </Form.Item>

                    <Form.Item label="Giới tính" name="gioiTinh">
                        <Radio.Group
                            value={userData.gioiTinh}
                            onChange={(e) => handleInputChange('gioiTinh', e.target.value)}
                        >
                            <Radio value="Male"> Male </Radio>
                            <Radio value="Female"> Female </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Status" name="trangThai">
                        <Radio.Group
                            value={userData.trangThai}
                            onChange={(e) => handleInputChange('trangThai', e.target.value)}
                        >
                            <Radio value={true}> Active </Radio>
                            <Radio value={false}> NotActive </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Role" name="quyen">
                        <Radio.Group
                            value={userData.quyen}
                            onChange={(e) => handleInputChange('quyen', e.target.value)}
                        >
                            <Radio value="CEO"> CEO </Radio>
                            <Radio value="Admin"> Admin </Radio>
                            <Radio value="Manager"> Manager </Radio>
                            <Radio value="Seller"> Seller </Radio>
                            <Radio value="Member"> User </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default UpdateUser;
