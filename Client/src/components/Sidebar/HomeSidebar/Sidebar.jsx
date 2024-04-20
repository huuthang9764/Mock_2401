import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FaBook } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { GiBearFace } from "react-icons/gi";
import { GiAxeInStump } from "react-icons/gi";
import { GiBackForth } from "react-icons/gi";
import { GiBattery50 } from "react-icons/gi";
import { GiBleedingHeart } from "react-icons/gi";
import { GiBranchArrow } from "react-icons/gi";

// Hàm để tạo số ngẫu nhiên trong một phạm vi
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Sidebar = () => {
  // Danh sách các danh mục sản phẩm
  const categories = [
    { name: "Sách", icon: FaBook },
    { name: "Điện thoại", icon: GiSmartphone },
    { name: "Thể thao", icon: IoIosFootball },
    { name: "Đồ chơi", icon: GiBearFace },
    { name: "Rượu", icon: GiAxeInStump },
    { name: "Văn phòng phẩm", icon: GiBleedingHeart },
    { name: "Phụ Kiện", icon: GiBackForth },
    { name: "Di Động", icon: GiBattery50 },
    { name: "Hoa", icon: GiBranchArrow },
  ];

  // Tạo danh sách các ListItem từ danh sách danh mục sản phẩm
  const categoryItems = categories.map((category, index) => (
    <ListItem button key={index}>
      <ListItemIcon>
        <category.icon />
      </ListItemIcon>
      <ListItemText primary={category.name} />
    </ListItem>
  ));

  // Render thanh Sidebar
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: 10,
        },
      }}
    >
      <List>
        {categoryItems}
      </List>
    </Drawer>
  );
};

export default Sidebar;
