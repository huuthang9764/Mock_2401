import React from 'react'
import { Flex, Button } from 'antd';
import './style.scss'

const FormChangeStatusAndDelete = ({ handleCancel, handleChangeStatus,}) => {

  
  return (
    <>
      <div>
        <div className='form-content'>
          Vui lòng xác nhận: Xóa sản phẩm vĩnh viễn hoặc đổi trạng thái sản phẩm thành NotActive
        </div>
        <Flex gap="middle" wrap="wrap" justify="center">
          <Button type="primary" onClick={handleChangeStatus}>Đổi trạng thái thành NotActive</Button>
          <Button type="primary" danger onClick={handleCancel}>Xóa Vĩnh Viễn</Button>
          <Button onClick={handleCancel}>Hủy bỏ</Button>
        </Flex>
      </div>
      
    </>
  )
}

export default FormChangeStatusAndDelete
