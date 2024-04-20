import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getPaymentMethods } from '../../service/CartService';

const PaymentModal = ({ show, handleClose, setPayment, defaultPaymentId }) => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    setSelectedPayment(defaultPaymentId);
    fetchPaymentMethods(); // Thiết lập giá trị ban đầu khi prop thay đổi
  }, [defaultPaymentId]);

  const fetchPaymentMethods = async () => {
    try {
      const res = await getPaymentMethods();
      if (res && res.data && res.data.content) {
        setPaymentMethods(res.data.content);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePaymentSelect = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleSavePayment = () => {
    setPayment(selectedPayment);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chọn phương thức thanh toán</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select onChange={handlePaymentSelect} value={selectedPayment}>
          <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
          <option value="Chuyển khoản ngân hàng">Chuyển khoản ngân hàng</option>
          <option value="Thanh toán qua ví điện tử">Thanh toán qua ví điện tử</option>
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSavePayment}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
