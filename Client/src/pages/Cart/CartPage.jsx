import React, { useEffect, useState } from "react";
import { Table, Button, Input, Checkbox, Modal } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./CartPage.scss";
import AddressModal from "./AddressModal";
import PaymentModal from "./PaymentModal";
import DeliveryModal from "./DeliveryModal";
import { deleteCartItem, getDataTable } from "../../service/CartService";
import ModalThanhToan from "./ModalThanhToan";
import Header from "../../components/Header/Header";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const [shippingAddress, setShippingAddress] = useState("Địa chỉ 1"); // Đặt địa chỉ mặc định
  const [paymentMethod, setPaymentMethod] = useState(
    "Thanh toán khi nhận hàng"
  );
  const [deliveryMethod, setDeliveryMethod] = useState("Giao hàng tiêu chuẩn");
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false); // Thêm state cho modal thanh toán
  const [showDeliveryModal, setShowDeliveryModal] = useState(false); // Thêm state cho modal giao hàng
  const [selectedRows, setSelectedRows] = useState({});

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [showModalThanhToan, setShowModalThanhToan] = useState(false);

  useEffect(() => {
    fetchData();
  }, [cartItems]);

  const fetchData = async () => {
    try {
      const res = await getDataTable();
      if (res && res.data) {
        const dataWithKeys = res.data.map((item, index) => ({
          ...item,
          key: index.toString(), // Thêm key cho mỗi phần tử
        }));
        setCartItems(dataWithKeys);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClose = () => {
    setShowAddressModal(false);
    setShowPaymentModal(false);
    setShowDeliveryModal(false);
    setShowModalThanhToan(false);
  };
  const handleOpenAddressModal = () => {
    setShowAddressModal(true);
  };

  const handleShowModalThanhToan = () => {
    setShowModalThanhToan(true);
  };

  const handleOpenPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const handleOpenDeliveryModal = () => {
    setShowDeliveryModal(true);
  };

  const openConfirmDeleteModal = (item) => {
    setItemToDelete(item);
    setConfirmDeleteVisible(true);
  };

  const closeConfirmDeleteModal = () => {
    setItemToDelete(null);
    setConfirmDeleteVisible(false);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        await deleteCartItem(itemToDelete.maSanPham);
        const updatedCartItems = cartItems.filter(
          (item) => item.maSanPham !== itemToDelete.maSanPham
        );
        setCartItems(updatedCartItems);
        closeConfirmDeleteModal();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleQuantityChange = (record, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    const updatedCartItems = cartItems.map((item) =>
      item.key === record.key ? { ...item, soLuong: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleAllCheckboxChange = (checked) => {
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      selected: checked, // Cập nhật trạng thái selected của tất cả các sản phẩm
    }));
    setCartItems(updatedCartItems);

    // Cập nhật lại state selectedRows để phản ánh trạng thái được chọn mới của tất cả các sản phẩm
    const newSelectedRows = {};
    updatedCartItems.forEach((item) => {
      newSelectedRows[item.key] = checked;
    });
    setSelectedRows(newSelectedRows);
  };

  const handleCheckboxChange = (record) => {
    const updatedSelectedRows = { ...selectedRows };
    updatedSelectedRows[record.key] = !updatedSelectedRows[record.key];

    // Cập nhật trạng thái selected của sản phẩm
    const updatedCartItems = cartItems.map((item) =>
      item.key === record.key
        ? { ...item, selected: updatedSelectedRows[record.key] }
        : item
    );

    setSelectedRows(updatedSelectedRows);
    setCartItems(updatedCartItems);
  };

  const calculateTotalSelectedPrice = () => {
    const total = cartItems.reduce((acc, item) => {
      if (selectedRows[item.key]) {
        return acc + item.donGia * item.soLuong;
      }
      return acc;
    }, 0);
    return total;
  };

  const isAnyProductSelected = Object.values(selectedRows).some(
    (value) => value
  );
  const clearSelectedItems = () => {
    const updatedCartItems = cartItems.map((item) =>
      selectedRows[item.key] ? { ...item, selected: false } : item
    );
    setCartItems(updatedCartItems);
    setSelectedRows({}); // Xóa tất cả các mục đã chọn
  };

  const columns = [
    {
      title: (
        <Checkbox onChange={(e) => handleAllCheckboxChange(e.target.checked)} />
      ),
      key: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={record.selected}
          onChange={() => handleCheckboxChange(record)}
        />
      ),
    },
    {
      title: "Ảnh",
      key: "anhMinhHoa",
      render: (_, record) => (
        <img
          src={`http://res.cloudinary.com/djhoea2bo/image/upload/v1711546395/${record.anhMinhHoa}`}
          alt={record.name}
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
    },
    {
      title: "Đơn giá",
      dataIndex: "donGia",
      key: "donGia",
      render: (price) => price.toLocaleString() + " VNĐ",
    },
    {
      title: "Số lượng",
      key: "soLuong",
      align: "center",
      render: (_, record) => (
        <Input.Group
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            type="text"
            icon={<CaretLeftOutlined />}
            onClick={() => handleQuantityChange(record, record.soLuong - 1)}
          />
          <Input
            style={{ width: 40, textAlign: "center", paddingBottom: 4.5 }}
            value={record.soLuong}
            readOnly
          />
          <Button
            type="text"
            icon={<CaretRightOutlined />}
            onClick={() => handleQuantityChange(record, record.soLuong + 1)}
          />
        </Input.Group>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "thanhTien",
      key: "thanhTien",
      render: (_, record) =>
        (record.donGia * record.soLuong).toLocaleString() + " VNĐ",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => openConfirmDeleteModal(record)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <>
      <Header/>
      <div>
        <h2>Giỏ hàng</h2>
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={cartItems}
            rowKey="maSanPham"
            style={{
              marginLeft: "70px",
              marginRight: "70px",
              marginTop: "20px",
            }}
            pagination={false}
          />
        </div>

        <div className="footer">
          <div className="footer-content">
            Địa chỉ nhận hàng: {shippingAddress}
            <Button
              className="btn-change"
              type="link"
              onClick={handleOpenAddressModal}
            >
              Thay đổi
            </Button>
            <AddressModal show={showAddressModal} handleClose={handleClose} />
          </div>
          <div className="footer-content">
            Phương thức thanh toán: {paymentMethod}
            <Button
              className="btn-change"
              type="link"
              onClick={handleOpenPaymentModal}
            >
              Thay đổi
            </Button>
            <PaymentModal
              show={showPaymentModal}
              handleClose={handleClose}
              setPaymentMethod={setPaymentMethod}
              defaultPaymentMethod="Thanh toán khi nhận hàng"
            />
          </div>
          <div className="footer-content">
            Phương thức giao hàng: {deliveryMethod}
            <Button
              className="btn-change"
              type="link"
              onClick={handleOpenDeliveryModal}
            >
              Thay đổi
            </Button>
            <DeliveryModal
              show={showDeliveryModal}
              handleClose={handleClose}
              setDeliveryMethod={setDeliveryMethod}
              defaultDeliveryMethod="Giao hàng tiêu chuẩn"
            />
          </div>
          <div className="totalcost">
            <span style={{ marginRight: "20px" }}>
              Tổng giá trị các sản phẩm :{" "}
              {calculateTotalSelectedPrice().toLocaleString()} VNĐ
            </span>
            <Button type="primary" onClick={() => handleShowModalThanhToan()}>
              Thanh toán
            </Button>
          </div>
        </div>
      </div>
      <AddressModal
        show={showAddressModal}
        handleClose={handleClose}
        setShippingAddress={setShippingAddress}
        defaultAddress="Địa chỉ 1"
      />
      <DeliveryModal
        show={showDeliveryModal}
        handleClose={handleClose}
        setDeliveryMethod={setDeliveryMethod}
        defaultDeliveryId={4}
      />
      <PaymentModal
        show={showPaymentModal}
        handleClose={handleClose}
        setPayment={setPaymentMethod}
        defaultPaymentId={4}
      />
      <Modal
        title="Xác nhận xóa sản phẩm"
        open={confirmDeleteVisible}
        onOk={handleDeleteConfirm}
        onCancel={closeConfirmDeleteModal}
      >
        <p>Bạn có chắc muốn xóa sản phẩm này?</p>
      </Modal>

      <ModalThanhToan
        show={showModalThanhToan}
        handleClose={handleClose}
        isAnyProductSelected={isAnyProductSelected}
        clearSelectedItems={clearSelectedItems}
      />
    </>
  );
};

export default CartPage;