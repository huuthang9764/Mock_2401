import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { Alert, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { onUserDeleteModalClose } from "../../redux/slices/modalCloseSlice.jsx";

const DeleteUser = ({ open, handleClose, handleOpen }) => {
    const [userData, setUserData] = useState({
        HoTen: '',
        NgaySinh: '',
        NgayTao: '',
        SoDienThoai: '',
        Email: '',
        GioiTinh: '',
        Status: '',
        role: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmClose, setConfirmClose] = useState(false);

    const rowId = useSelector((state) => state.tableCheckBox.selected);
    useEffect(() => {
    }, [rowId]);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(onUserDeleteModalClose(!open));
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


    const handleDeleteUser = async () => {
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
            setSuccessMessage('Xóa người dùng thành công!');
            setTimeout(() => {
                handleClose();
            }, 1000);
        } catch (error) {
            if (error.response) {
                // Nếu có response từ backend
                console.error("Error creating user:", error.response.data);
                setErrorMessage("Xóa người dùng thất bại!: \n" + error.response.data.detailMessage);
            } else if (error.request) {
                // Nếu request được gửi đi nhưng không nhận được response
                console.error("Error creating user: No response received from server");
                setErrorMessage("Xóa người dùng thất bại! \nKhông nhận được phản hồi từ máy chủ.");
            } else {
                // Nếu có lỗi trong quá trình thiết lập request
                console.error("Error creating user:", error.message);
                setErrorMessage("Xóa người dùng thất bại! \n" + error.message);
            }
        }
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
                `http://localhost:8080/TaiKhoan/${rowId}`,
                userData
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
                setErrorMessage("Cập nhật thông tin  người dùng thất bại! \nKhông nhận được phản hồi từ máy chủ.");
            } else {
                // Nếu có lỗi trong quá trình thiết lập request
                console.error("Error creating user:", error.message);
                setErrorMessage("Cập nhật thông tin  người dùng thất bại! \n" + error.message);
            }
        }
    };

    const handleDeleteSubmit = () => {
        // handleDeleteUser();
        alert("Nhà phát triển yêu cầu không xóa vĩnh viễn người dùng")
    };

    useEffect(() => {
        setUserData(userData => ({
            ...userData,
            trangThai: false
        }));
    }, [userData.trangThai]);

    const handleUpdateSubmit = () => {
        handleUpdateUser();
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
                <Button key="submit" type="primary" danger onClick={handleDeleteSubmit}>
                    Xóa vĩnh viễn Người Dùng
                </Button>,
                <Button key="submit" type="primary" onClick={handleUpdateSubmit}>
                    Chuyển thành NotActive
                </Button>,
            ]}
        >
            <div style={{ marginTop: 30 }}>
                <h2>Xóa người dùng</h2>
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
                                Tiếp tục xóa người dùng
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
            </div>
        </Modal>
    );
};

export default DeleteUser;
