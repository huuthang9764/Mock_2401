import { Menu } from "antd";
import {
  CodeSandboxOutlined,
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {setUserLoginInfo} from "../../redux/userLoginInfo";

const MyMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(["/"]);

  const menuItems = [
    // HomePage
    // {
    //   key: "/",
    //   icon: <HomeOutlined />,
    //   label: "Home",
    //   role: ["Manager", "Seller", "Ceo", "Admin", "Member", "Guest"]
    // },

    //Ceo
    {
      key: "/dashboard/ceo",
      icon: <DashboardOutlined />,
      label: "Thống kê",
      role: ["CEO"]
    },

    {
      key: "/dashboard/CEO/staffManage",
      icon: <DashboardOutlined />,
      label: "Thông tin nhân viên",
      role: ["CEO"]
    },

    {
      key: "/dashboard/Admin",
      icon: <UserOutlined />,
      label: "Người dùng",
      role: ["Admin"]
    },


    //Manager
    //Manager
    {
      key: "/dashboard/Manager",
      icon: <HomeOutlined />,
      label: "Manager Dashboard",
      role: ["Manager"]
    },

    {
      key: "/dashboard/Manager/products",
      icon: <CodeSandboxOutlined />,
      label: "Sản phẩm",
      role: ["Manager"]
    },
    {
      key: "/dashboard/Manager/categories",
      icon: <CodeSandboxOutlined />,
      label: "Loại sản phẩm",
      role: ["Manager"]
    },
    {
      key: "/dashboard/Manager/inventory",
      icon: <CodeSandboxOutlined />,
      label: "Tồn kho",
      role: ["Manager"]
    },
    {
      key: "/dashboard/Manager/brand",
      icon: <CodeSandboxOutlined />,
      label: "Thương hiệu",
      role: ["Manager"]
    },
    {
      key: "/dashboard/Manager/order",
      icon: <CodeSandboxOutlined />,
      label: "Đơn hàng",
      role: ["Manager", "Seller"]
    },

    
  ];

  const localrole = localStorage.getItem('savedUserRole');
  const localUserName = localStorage.getItem("savedUserName")
  const localUserId = localStorage.getItem("savedUserId")

  const sessionRole = sessionStorage.getItem('savedUserRole');
  const sessionUserName = sessionStorage.getItem("savedUserName")
  const sessionUserId = sessionStorage.getItem("savedUserId")

  const role = localrole || sessionRole;
  const userName = localUserName || sessionUserName;
  const userId = localUserId || sessionUserId;


  const profile = {
    userId: userId,
    userName: userName,
    role: role,
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserLoginInfo(profile));
  }, [dispatch]);


  const filteredMenuItems = menuItems.filter(item => item.role.includes(profile.role));
  const handleMenuClick = ({ key }) => {
    navigate(key);
    setSelectedKeys([key]);
  };

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);


  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      onClick={handleMenuClick}
      items={filteredMenuItems}
    >
      {/* {menuItems.map((item) => {
        if (item.role.includes(profile.role)) {
          return (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          )
        }
      })} */}
    </Menu>
  );
};

export default MyMenu;


