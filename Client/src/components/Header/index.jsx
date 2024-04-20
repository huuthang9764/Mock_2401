/* eslint-disable react/prop-types */
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Image, Layout } from "antd";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const Header = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: "Chỉnh sửa thông tin",
      onClick() {
        navigate("/profile");
      },
    },
    {
      key: "2",
      label: "Đăng xuất",
      onClick() {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      },
    },
  ];

  const userName = sessionStorage.getItem("savedUserName") || localStorage.getItem("savedUserName");
  const role = sessionStorage.getItem('savedUserRole') || localStorage.getItem("savedUserRole");
  return (
    <Layout.Header className="header">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="collapsed-button"
      />
      <div>
        <span style={{ marginRight: 10 }}>Xin Chào, {userName}  ||  {role}</span>
        <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }} on>
          {/* <Avatar size="large" icon={<UserOutlined />} /> */}
          <Avatar size="large" src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5c/Chelsea_crest.svg/1200px-Chelsea_crest.svg.png" />
          
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default Header;