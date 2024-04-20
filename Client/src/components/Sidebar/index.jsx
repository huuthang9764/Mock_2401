import React from 'react'
import Sider from 'antd/es/layout/Sider'
import MyMenu from './MyMenu'
import './style.scss'

const Sidebar = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className='sidebar-swapper'>
      {/* <div className="demo-logo-vertical" /> */}
      <MyMenu />
    </Sider>
  )
}

export default Sidebar
