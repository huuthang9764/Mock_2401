import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { deleteManyLoaiSanPham } from "../../../service/UserService";
import { toast } from "react-toastify";

const ModalDeleteMany = ({
  show,
  handleClose,
  dataDeleteMany,
  getUser,
  clearSelectedCheckboxes,
}) => {
  const xoaNhieuLoaiSanPham = async () => {
    try {
      if (dataDeleteMany.includes(1)) {
        // Hiển thị thông báo cảnh báo nếu danh mục có ID là 1
        toast.warning("Không thể xóa danh mục có ID là 1");
        handleClose();
        clearSelectedCheckboxes();
        return;
      }
      const res = await deleteManyLoaiSanPham(dataDeleteMany); // Truyền danh sách ID cần xóa vào hàm xóa nhiều loại sản phẩm
      if (res && +res.status === 200) {
        toast.success("Xóa loại sản phẩm thành công");
        handleClose();
        getUser(); // Gọi lại hàm để cập nhật dữ liệu sau khi xóa
        clearSelectedCheckboxes();
      } else {
        toast.error("Xóa loại sản phẩm không thành công. Vui lòng thử lại!!!");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
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
            <div>Bạn có chắc muốn xóa các loại sản phẩm đã chọn không?</div>
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
          <Button variant="primary" onClick={() => xoaNhieuLoaiSanPham()}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteMany;
