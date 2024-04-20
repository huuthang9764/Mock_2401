import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { updateLoaiSanPham } from "../../../service/UserService";
import { toast } from "react-toastify";

const ModalEdit = ({ show, handleClose, dataEdit, getUser }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const suaLoaiSanPham = async () => {
    try {
      await updateLoaiSanPham(id, name);
      toast.success("Cập nhật thành công!");
      handleClose();
       getUser();
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật!");
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataEdit.tenLoaiSanPham);
      setId(dataEdit.maLoaiSanPham);
    }
  }, [dataEdit]);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Sửa loại sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="number"
              value={id}
              onChange={(event) => setId(event.target.value)}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên loại sản phẩm</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => suaLoaiSanPham()}>
            Thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
