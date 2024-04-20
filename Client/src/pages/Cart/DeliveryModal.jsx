import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getDeliveryMethods } from "../../service/CartService";

const DeliveryModal = ({ show, handleClose, setDeliveryMethod, defaultDeliveryId }) => {
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [deliveryMethods, setDeliveryMethods] = useState([]);

  useEffect(() => {
    setSelectedDelivery(defaultDeliveryId); // Đặt selectedDelivery là id của phương thức giao hàng mặc định
    fetchDeliveryMethods(); // Gọi hàm khi component được render
  }, [defaultDeliveryId]);


  const fetchDeliveryMethods = async () => {
    try {
      const res = await getDeliveryMethods();
      if (res && res.data && res.data.content) {
        setDeliveryMethods(res.data.content);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeliverySelect = (event) => {
    setSelectedDelivery(event.target.value);
  };

  const handleSaveDelivery = () => {
    setDeliveryMethod(selectedDelivery);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chọn phương thức giao hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select onChange={handleDeliverySelect} value={selectedDelivery} defaultValue={"a"}>
          {deliveryMethods.map((method, index) => (
            <option key={index} value={method.tenDichVu}>
              {method.tenDichVu}
            </option>
          ))}
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSaveDelivery}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeliveryModal;
