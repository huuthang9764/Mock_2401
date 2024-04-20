import { Modal } from "antd";

const MyModal = ({ children, ...props }) => {
  return (
    <Modal maskClosable={false} footer={[]} {...props}>
      {children}
    </Modal>
  );
};

export default MyModal;
