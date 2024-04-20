import { Button, Flex, Form, Input } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MySpin from '../../MySpin';
import { searchBrands, updateBrand } from '../../../redux/slices/brand';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const FormUpdateBrand = ({ selectedBrands, actionModal, isModalOpen, handleCancel, searchTerm, pageNumber, pageSize }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const status = useSelector((state) => state.brand.status);

  const initialData = selectedBrands[0];
  useEffect(() => {
    if (actionModal === 'UPDATE') {
      form.setFieldsValue({
        tenThuongHieu: initialData.tenThuongHieu
      })
    }
  }, [actionModal, initialData, form, isModalOpen])

  const handleFinish = () => {
    try {
      const { maThuongHieu } = initialData;
      const currentData = form.getFieldsValue();
      dispatch(updateBrand({ id: maThuongHieu, data: currentData })).then(unwrapResult)
        .then(response => {
          toast.success("Update thương hiệu thành công !", {
            position: "top-right"
          });
          // setPageNumber(1)
          dispatch(searchBrands({ searchTerm, pageNumber, pageSize }));

          handleCancel()
        }).catch(error => {
          toast.error("Update thương hiệu không thành công!", {
            position: "top-right"
          });
        })
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <div>
      {status === 'loading' ? (
        <MySpin />
      ) : (
        <Form
          {...formItemLayout}
          variant="filled"
          form={form}
          onFinish={handleFinish}
          style={{
            maxWidth: 500,
          }}
        >
          <Form.Item
            label="Tên Thương Hiệu"
            name="tenThuongHieu"
            rules={[{ required: true, message: "Please input!" }]}
            style={{ margin: '30px 0' }}
          >
            <Input />
          </Form.Item>
          <Flex justify='center'>
            <Form.Item style={{ margin: '0' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      )}

    </div>
  )
}

export default FormUpdateBrand
