import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { deleteLoaiSanPham } from "../../../../service/manager/categoryService";
import { toast } from "react-toastify";

const ModalDelete = ({ show, handleClose, dataDelete, getUser }) => {
  const xoaLoaiSanPham = async () => {
    let res = await deleteLoaiSanPham(dataDelete.maLoaiSanPham);
    console.log(res);
    if (res && +res.status === 200) {
      toast.success("Xóa loại sản phẩm thành công");
      handleClose();
      getUser()
    } else {
      toast.error("Xóa loại sản phẩm không thành công. Vui lòng thử lại!!!");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Xóa loại sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div>Bạn có chắc muốn xóa loại sản phẩm này không?</div>
            <div style={{ color: "red" }}>
              Lưu ý: Các mặt hàng còn lại sẽ được chuyển vào phần:
            </div>
            <div style={{ color: "red" }}>&quot;Các loại sản phẩm còn lại&quot;</div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => xoaLoaiSanPham()}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
