import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import React from 'react'

const MyUpload = (props) => {
  return (
    <Upload
    maxCount={4}
    beforeUpload={() => false}
    accept="image/png, image/jpeg, image/jpg, image/webp"
    {...props}
  >
    <Button icon={<UploadOutlined />}>Tải lên</Button>
  </Upload>
  )
}

export default MyUpload
