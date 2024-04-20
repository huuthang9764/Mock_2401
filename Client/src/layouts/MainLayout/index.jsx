import { useState } from "react";
import { Layout } from "antd";
const { Content } = Layout;
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "./style.scss";


const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="main-layout">
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
      <Sidebar collapsed={collapsed} />
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
