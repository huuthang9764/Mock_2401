import React from 'react'
import MySpin from '../../MySpin'
import { Button, Flex, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createBrand, searchBrands } from '../../../redux/slices/brand';
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
const FormCreateBrand = ({ isModalOpen, handleCancel, searchTerm, pageNumber, pageSize }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const status = useSelector((state) => state.brand.status);

  const handleFinish = () => {
    try {
      const currentData = form.getFieldsValue();
      dispatch(createBrand({ data: currentData })).then(unwrapResult)
      .then(response => {
        toast.success("Update thương hiệu thành công !", {
          position: "top-right"
        });
        // setPageNumber(1)
        dispatch(searchBrands({ searchTerm, pageNumber:1, pageSize }));
        handleCancel();
        form.resetFields();
      }).catch(error => {
        toast.error("Update thương hiệu không thành công!", {
          position: "top-right"
        });
      })
    handleCancel()
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

export default FormCreateBrand
