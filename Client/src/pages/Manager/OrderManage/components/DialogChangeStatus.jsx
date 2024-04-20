import { Button, Modal } from "antd";

const DialogChangeStatus = ({ open, details, title, onClose = () => {}, onSubmit = () => {} }) => {
  return (
    <Modal
      width={600}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Đóng
        </Button>,
        <Button key="submit" onClick={onSubmit}>
          Xác nhận
        </Button>,
      ]}
    >
      <h1>Xác nhận thay đổi đơn hàng {`#${details.maDonHang}`}</h1>

      <p>{title}</p>
    </Modal>
  );
};

export default DialogChangeStatus;
