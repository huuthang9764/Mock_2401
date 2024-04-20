import React from 'react'
import { Button, Col, Row,  } from 'antd'
import './style.scss'
import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons'
import { Breadcrumbs } from '../../components'



const ContentHeader = (props) => {
  return (
    <>
      {/* <Row>
        <Col>
          <Breadcrumbs />
        </Col>
      </Row> */}
      <Row className='content-header'>
        <Col>
          <Button type="primary" size='large'
            onClick={props.handleAdd}
            className='btn-act'>
            <PlusOutlined />
            Thêm Sản Phẩm
          </Button>
        </Col>
        <Col >
          <Button type="primary" size='large'
            className='btn-act'
            onClick={props.hanldeUpdate}
            disabled={props.selectedRowKeys.length !== 1}>
          <FormOutlined />
            Sửa Sản Phẩm
          </Button>
        </Col>
        <Col>
          <Button type="primary" danger size='large'
            className='btn-act'
            onClick={props.hanldeDelete}
            disabled={props.selectedRowKeys.length !== 1}>
          <DeleteOutlined />
            Xóa Sản Phẩm
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default ContentHeader
