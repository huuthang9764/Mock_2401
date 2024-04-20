import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import axios from 'axios';
import { Alert, Space } from 'antd';
import { useSelector } from "react-redux";

const ChangePassword = ({ open, handleClose }) => {
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
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const rowId = useSelector((state) => state.tableCheckBox.selected);
    useEffect(() => {
    }, [rowId]);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(e.target.value === password);
    };


    useEffect(() => {
        if (confirmPassword !== password) {
            setUserData(prevUserData => ({
                ...prevUserData,
                MatKhau: password
            }));
        }
    }, [confirmPassword, password]);

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
            await axios.patch(
                `http://localhost:8080/TaiKhoan`,
                userData
            );
            setSuccessMessage('Đổi mật khẩu người dùng thành công!');
            setTimeout(() => {
                handleClose();
            }, 1000);
        } catch (error) {
            if (error.response) {
                // Nếu có response từ backend
                console.error("Error creating user:", error.response.data);
                setErrorMessage("Đổi mật khẩu thất bại!: \n" + error.response.data.detailMessage);
            } else if (error.request) {
                // Nếu request được gửi đi nhưng không nhận được response
                console.error("Error creating user: No response received from server");
                setErrorMessage("Đổi mật khẩu  thất bại! \nKhông nhận được phản hồi từ máy chủ.");
            } else {
                // Nếu có lỗi trong quá trình thiết lập request
                console.error("Error creating user:", error.message);
                setErrorMessage("Đổi mật khẩu thất bại! \n" + error.message);
            }
        }
    };


    const handleUpdateSubmit = () => {
        handleUpdateUser();
    };

    const handleInputChange = (name, value) => {
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                    onClick={handleUpdateSubmit}
                    disabled={!passwordMatch}
                >
                    Reset Password
                </Button>,
            ]}
        >
            <div style={{ marginTop: 30 }}>
                <h1>Reset mật khẩu người dùng</h1>
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
                                Tiếp tục reset mật khẩu người dùng
                            </Button>,
                            <Button key="submit" type="primary" onClick={() => {
                                handleConfirmClose();
                            }}>
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
                        matKhau: "",
                        xacNhanMatKhau: "",
                    }}
                >
                    <div style={{ textAlign: "right" }}>
                        <h3>Mã Tài Khoản: {rowId}</h3>
                        <h3>Họ tên: {userData.hoTen}</h3>
                    </div>
                    <br />
                    <br />

                    {/*<Form.Item*/}
                    {/*    label="Mật Khẩu Mới"*/}
                    {/*    name="matKhau"*/}
                    {/*    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}*/}
                    {/*>*/}
                    {/*    <Input.Password*/}
                    {/*        placeholder="Mật Khẩu Mới"*/}
                    {/*        value={password}*/}
                    {/*        onChange={handlePasswordChange}*/}
                    {/*        style={{ marginBottom: '16px' }}*/}
                    {/*    />*/}
                    {/*</Form.Item>*/}

                    {/*<Form.Item*/}
                    {/*    label="Xác nhận Mật Khẩu"*/}
                    {/*    name="xacNhanMatKhau"*/}
                    {/*    rules={[*/}
                    {/*        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },*/}
                    {/*        ({ getFieldValue }) => ({*/}
                    {/*            validator(_, value) {*/}
                    {/*                if (!value || getFieldValue('matKhau') === value) {*/}
                    {/*                    return Promise.resolve();*/}
                    {/*                }*/}
                    {/*                return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));*/}
                    {/*            },*/}
                    {/*        }),*/}
                    {/*    ]}*/}
                    {/*    validateStatus={passwordMatch ? undefined : 'error'}*/}
                    {/*    help={passwordMatch ? 'Mật khẩu xác nhận đã khớp!' : 'Mật khẩu xác nhận không khớp!'}*/}
                    {/*>*/}
                    {/*    <Input.Password*/}
                    {/*        placeholder="Xác nhận Mật khẩu"*/}
                    {/*        value={confirmPassword}*/}
                    {/*        onChange={handleConfirmPasswordChange}*/}
                    {/*        style={{ marginBottom: '16px' }}*/}
                    {/*    />*/}
                    {/*</Form.Item>*/}
                </Form>
            </div>
        </Modal>
    );
};

export default ChangePassword;
