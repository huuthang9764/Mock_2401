import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddressModal = ({ show, handleClose, setShippingAddress, defaultAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);


  useEffect(() => {
    setSelectedAddress(defaultAddress); // Thiết lập giá trị ban đầu khi prop thay đổi
  }, [defaultAddress]);

  const handleAddressSelect = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleSaveAddress = () => {
    setShippingAddress(selectedAddress);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chọn địa chỉ nhận hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select onChange={handleAddressSelect} value={selectedAddress}>
          <option value="Địa chỉ 1">Địa chỉ 1</option>
          <option value="Địa chỉ 2">Địa chỉ 2</option>
          <option value="Địa chỉ 3">Địa chỉ 3</option>
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSaveAddress}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddressModal;
