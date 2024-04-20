import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Flex } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteBrand, searchBrands } from '../../../redux/slices/brand';
import { toast } from 'react-toastify';

const FormDeleteBrand = ({ handleCancel, selectedBrands, searchTerm, pageNumber, pageSize }) => {
  const dispatch = useDispatch();
  const initialData = selectedBrands[0];
  const hanldeDeleteBrand = () => {
    try {
      const { maThuongHieu } = initialData;
      dispatch(deleteBrand({ id: maThuongHieu })).then(unwrapResult)
        .then(response => {
        console.log(response);
        toast.success("Delete thương hiệu thành công !", {
          position: "top-right"
        });
        // setPageNumber(1)
        dispatch(searchBrands({ searchTerm, pageNumber:1, pageSize }));
        handleCancel()
      }).catch(error => {
        toast.error("Không thể xóa thương hiệu này, vì nó đang ở trong 1 phần của 1 sản phẩm nào đó!", {
          position: "top-right"
        });
      })
    handleCancel()
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <>
      <div>
        <div className='form-content'>
         Ban có chắc xóa thương hiệu
          <strong> {initialData.tenThuongHieu} </strong>vĩnh viễn 
        </div>
        <Flex gap="middle" wrap="wrap" justify="center">
          <Button type="primary" danger onClick={hanldeDeleteBrand}>Xóa Vĩnh Viễn</Button>
          <Button onClick={handleCancel}>Hủy bỏ</Button>
        </Flex>
      </div>
      
    </>
  )
}

export default FormDeleteBrand
