import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const ModalThanhToan = ({ show, handleClose, isAnyProductSelected, clearSelectedItems }) => {
  const handleThanhToan = () => {
    if (isAnyProductSelected) {
      toast.success("Thanh toán thành công");
      handleClose();
      clearSelectedItems()
    } else {
      toast.warning("Vui lòng chọn sản phẩm để thanh toán");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Thanh toán</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div>Bạn muốn thanh toán sản phẩm này?</div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleThanhToan}>
          Thanh toán
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalThanhToan;