import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Space,
  Form,
  Select,
} from "antd";

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit';
import MyUpload from "../../MyUpload";
import { getBase64 } from "../../../utils/helper";
import { createProduct, searchProducts } from "../../../redux/slices/product";
import MySpin from "../../MySpin";




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

const FormCreate = ({ isModalOpen, handleCancel, searchTerm, pageNumber, pageSize }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const categories = useSelector((state) => state.category.categories.content);
  const brands = useSelector((state) => state.brand.brands.content);
  const status = useSelector((state) => state.product.status);
  const [danhSachAnhMinhHoa, setDanhSachAnhMinhHoa] = useState([]);


  const handleUploadChange = async ({ file, fileList }) => {
    console.log("fileList", fileList, file);
    if (fileList.length > danhSachAnhMinhHoa.length) {
      const getDanhSachMinhHoa = fileList.map(async (file) => {
        if (file.originFileObj) {
          const url = await getBase64(file.originFileObj);
          return { url };
        }
      });
      Promise.all(getDanhSachMinhHoa).then((res) => {
        const newArr = res.filter(item => Boolean(item))
        const updatedImages = [...danhSachAnhMinhHoa, ...newArr];
        setDanhSachAnhMinhHoa(updatedImages)
      });
    } else {

      setDanhSachAnhMinhHoa(danhSachAnhMinhHoa.filter(item => item.uid != file.uid))
    }
  };


  const handleFinish = async (values) => {

    const body = {
      ...values,
      danhSachAnhMinhHoa
    };

    dispatch(createProduct({ data: body })).then(unwrapResult)
      .then(response => {
        toast.success("Update sản phẩm thành công !", {
          position: "top-right"
        });
        // setPageNumber(1)
        dispatch(searchProducts({ searchTerm, pageNumber, pageSize }));
        handleCancel()
      }).catch(error => {
        toast.error("Update sản phẩm không thành công!", {
          position: "top-right"
        });
      })
    handleCancel()
  }
  return (
    <>
      {status === 'loading' ? (
        <MySpin />
      ) : (
        <Form
          {...formItemLayout}
          variant="filled"
          form={form}
          onFinish={handleFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="tenSanPham"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Xuất xứ"
            name="xuatXu"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="gia"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sơ lượt"
            name="soLuot"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả chi tiết"
            name="moTaChiTiet"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Loại sản phẩm"
            name="maLoaiSanPham"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              placeholder="Chọn loại sản phẩm"
              style={{
                width: 150,
              }}
              options={categories && categories.length > 0 ? (categories.map((item) => ({
                value: item.maLoaiSanPham,
                label: item.tenLoaiSanPham
              }))) : []}
            />
          </Form.Item>
          <Form.Item
            label="Thương hiệu"
            name="maThuongHieu"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              placeholder="Chọn Thương Hiệu"
              style={{
                width: 150,
              }}
              options={brands && brands.length > 0 ? (brands.map((item) => ({
                value: item.maThuongHieu,
                label: item.tenThuongHieu
              }))) : []}
            />
          </Form.Item>
          <Form.Item wrapperCol={{}}>
            <Space style={{ border: 1 }}>
              <MyUpload
                fileList={(danhSachAnhMinhHoa || [])}
                // fileList={(danhSachAnhMinhHoa || []).filter(item => item && urlImg/item.url)}
                onChange={handleUploadChange}
                multiple
                listType="picture-card"
              />
            </Space>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}

    </>
  )
}

export default FormCreate