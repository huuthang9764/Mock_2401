import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { postLoaiSanPham } from "../../../../service/manager/categoryService";
import { toast } from "react-toastify";

const ModalAddNew = ({ show, handleClose, updateTable }) => {
  const [name, setName] = useState("");

  // const themLoaiSanPham = async () => {
  //   let res = await postLoaiSanPham(name);
  //   if (res && res.data) {
  //     handleClose();
  //     setName("");
  //     toast.success("Thêm loại sản phẩm thành công");
  //     updateTable({
  //       maLoaiSanPham: res.data.maLoaiSanPham,
  //       tenLoaiSanPham: name,
  //     });
  //   } else {
  //     toast.error("Thêm loại sản phẩm thất bại. Xin thử lại!!!");
  //   }
  // };
  const themLoaiSanPham = async () => {
    try {
      let res = await postLoaiSanPham(name);
      console.log("check res",res.data);
      if (res && res.data) {
        handleClose();
        setName("");
        toast.success("Thêm loại sản phẩm thành công");
        updateTable({
          maLoaiSanPham: res.data.maLoaiSanPham,
          tenLoaiSanPham: name,
        });
      } else {
        toast.error("Thêm loại sản phẩm thất bại. Xin thử lại!!!");
        handleClose();
      }
    } catch (error) {
      // Xử lý lỗi 
      console.error("Error adding product category:", error.response.data.detailMessage);
      toast.error("Lỗi khi thêm loại sản phẩm. Vui lòng thử lại sau!!!");
      handleClose();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm loại sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <Button variant="primary" onClick={() => themLoaiSanPham()}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
