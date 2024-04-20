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
import { searchProducts, updateProduct } from "../../../redux/slices/product";
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
const urlImg = "http://res.cloudinary.com/djhoea2bo/image/upload/v1711546395/";
const FormUpdate = ({ selectedProducts, actionModal, isModalOpen, handleCancel, searchTerm, pageNumber, pageSize }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const categories = useSelector((state) => state.category.categories.content);
  const brands = useSelector((state) => state.brand.brands.content);
  const status = useSelector((state) => state.product.status);
  const [danhSachAnhMinhHoa, setDanhSachAnhMinhHoa] = useState([]);
  const [danhSachAnhCanThemMoi, setDanhSachAnhCanThemMoi] = useState([]);
  const [danhSachXoa, setDanhSachXoa] = useState([]);


  const initialData = selectedProducts[0];

  useEffect(() => {
    if (actionModal === "UPDATE") {
      form.setFieldsValue({
        tenSanPham: initialData.tenSanPham,
        xuatXu: initialData.xuatXu,
        gia: initialData.gia,
        soLuot: initialData.soLuot,
        moTaChiTiet: initialData.moTaChiTiet,
        trangThai: initialData.trangThai.toString(),
        maLoaiSanPham: initialData.maLoaiSanPham,
        maThuongHieu: initialData.maThuongHieu,
      });
      if (!isModalOpen) {
        setDanhSachAnhMinhHoa([]);
      } else {
        setDanhSachAnhMinhHoa(initialData.danhSachAnhMinhHoa.map((item, index) => ({
          id: index,
          url: `${urlImg}${item.url}`
        })));
      }
    }
  }, [actionModal, initialData, form, isModalOpen]);


  const handleUploadChange = async ({ file, fileList }) => {
    // console.log("fileList", fileList, file);
    if (fileList.length > danhSachAnhMinhHoa.length) {
      const getDanhSachMinhHoa = fileList.map(async (file) => {
        if (file.originFileObj) {
          const url = await getBase64(file.originFileObj);
          return { url };
        }
      });
      Promise.all(getDanhSachMinhHoa).then((res) => {
        const newArr = res.filter(item => Boolean(item))
        setDanhSachAnhCanThemMoi(newArr)
        const updatedImages = [...danhSachAnhMinhHoa, ...newArr];
        setDanhSachAnhMinhHoa(updatedImages)
      });
    } else {
      setDanhSachXoa(danhSachXoa.concat({ url: file.url }))
      setDanhSachAnhMinhHoa(danhSachAnhMinhHoa.filter(item => item.id != file.id))
    }
  };

  const handleFinish = async () => {
    try {
      const { maSanPham } = initialData;
      const currentData = form.getFieldsValue();
      // Lọc ra những trường đã thay đổi
      const changedFields = Object.keys(currentData).filter(key => currentData[key] !== initialData[key]);
      const changedData = {};
      changedFields.forEach(field => {
        changedData[field] = currentData[field];
      });
      const danhSachAnhCanXoa = danhSachXoa.map(item => {
        let index = item.url.lastIndexOf(urlImg);
        let newUrl = item.url.substring(index + urlImg.length);
        item.url = newUrl;
        return item;
      });
      const body = {
        ...changedData,
        danhSachAnhCanThemMoi,
        danhSachAnhCanXoa,
      };
      dispatch(updateProduct({ id: maSanPham, data: body })).then(unwrapResult)
        .then(response => {
          toast.success("Update sản phẩm thành công !", {
            position: "top-right"
          });
          // setPageNumber(1)
          dispatch(searchProducts({ searchTerm, pageNumber, pageSize }));
          setDanhSachAnhCanThemMoi([]);
          setDanhSachXoa([]);
          handleCancel()
        }).catch(error => {
          toast.error("Update sản phẩm không thành công!", {
            position: "top-right"
          });
        })
    } catch (error) {
      throw new Error(error);
    }
  };
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
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Tên Sản Phẩm"
            name="tenSanPham"

          >
            <Input disabled />
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
            label="Sơ Lượt"
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
            label="Trạng thái"
            name="trangThai"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              style={{
                width: 150,
              }}
              options={[
                {
                  value: 'true',
                  label: 'Kích Hoạt',
                },
                {
                  value: 'false',
                  label: 'Hủy Kích Hoạt',
                }
              ]}
            />
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
            label="Thương Hiệu"
            name="maThuongHieu"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              placeholder="Chọn Thương Hiệu"
              style={{
                width: 150,
              }}
              // onChange={handleChangeCategory}
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

    </div>
  )
}

export default FormUpdate