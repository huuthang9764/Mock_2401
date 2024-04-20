

import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.png";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom"; 
import { CiSearch, CiUser } from "react-icons/ci";
import { FaHome, FaCartPlus } from "react-icons/fa";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, TextField ,Stack  } from "@mui/material";
import { styled } from "@mui/system";
import { getIdUser } from "../../utils/helper";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#f0f8ff", 
});

const StyledToolbar = styled(Toolbar)({
  justifyContent: "space-between", 
});

const StyledIconButton = styled(IconButton)({
  color: "#666", 
});

const Header = ({ onSearchChange, hanldeFindsProduct, handleEnter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuthenticated = localStorage.getItem('savedUserName') || sessionStorage.getItem('savedUserName')
  const idUser = getIdUser();



  const handleLogin = (event) => {
    isAuthenticated ? setAnchorEl(event.currentTarget) : navigate("/login");
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    handleMenuClose();
    navigate("/");
  };

  const navigate = useNavigate();
  const handleCartOpen = () => {
    isAuthenticated ? navigate("/cart") : navigate("/login");
    
  };

  return (
    // <StyledAppBar position="static">
    //   <StyledToolbar>
    //     <Typography variant="h6" component="div">
    //       <img src={Logo} alt="Logo" style={{ maxHeight: 50, margin: 5, padding: 5 }} />
    //     </Typography>
    //     <div style={{ display: "flex", alignItems: "center" , width: "80%" }}>
    //       <TextField
    //         onChange={(e) => onSearchChange(e.target.value)}
    //         variant="outlined"
    //         onKeyDown={handleEnter}
    //         placeholder="Bạn tìm gì hôm nay"
    //         size="small"
    //         style={{ marginRight: 10, width: "100%" }}
    //         InputProps={{
    //           sx: { backgroundColor: "#fff", borderRadius: 5 } 
    //         }}
    //       />
    //       <StyledIconButton color="inherit" onClick={hanldeFindsProduct}>
    //         <CiSearch />
    //       </StyledIconButton>
    //     </div>
    //     <div>
    //       <StyledIconButton edge="start" aria-label="home" component={Link} to="/">
    //         <FaHome />
    //       </StyledIconButton>
    //       <StyledIconButton aria-label="account" onClick={handleMenuOpen}>
    //         <CiUser />
    //       </StyledIconButton>
    //       <StyledIconButton aria-label="cart" onClick={handleCartOpen}>
    //         <FaCartPlus />
    //       </StyledIconButton>
    //     </div>
    //   </StyledToolbar>
    //   <Menu
    //     anchorEl={anchorEl}
    //     open={Boolean(anchorEl)}
    //     onClose={handleMenuClose}
    //   >
    //     <MenuItem component={Link} to="/login">Đăng nhập</MenuItem>
    //     <MenuItem component={Link} to="/register">Đăng ký</MenuItem>
    //     <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
    //   </Menu>
    // </StyledAppBar>
    <StyledAppBar position="static">
      <StyledToolbar>
        <Link to="/">
          <Typography variant="h6" component="div">
            <img src={Logo} alt="Logo" style={{ maxHeight: 50, margin: 5, padding: 5 }} />
          </Typography>
        </Link>
        <div style={{ display: "flex", alignItems: "center", width: "70%" }}>
          <TextField
            variant="outlined"
            placeholder="Bạn tìm gì hôm nay"
            size="small"
            style={{ marginRight: 10, width: "100%" }}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleEnter}
            InputProps={{
              sx: { backgroundColor: "#fff", borderRadius: 5 }
            }}
          />
          <StyledIconButton color="inherit" onClick={hanldeFindsProduct}>
            <CiSearch />
          </StyledIconButton>
        </div>
        <div>
          <StyledIconButton edge="start" aria-label="home" component={Link} to="/">
            <FaHome />
          </StyledIconButton>
          {
            isAuthenticated ? (<StyledIconButton aria-label="account" onClick={handleMenuOpen}>
              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <CiUser />
                <span style={{fontSize:'12px'}}>{isAuthenticated}</span>
              </Stack>
            </StyledIconButton>) : (
              <StyledIconButton aria-label="account" onClick={handleLogin}>
                <Stack direction="row" alignItems="center" flexWrap="wrap">
                  <CiUser />
                  <span>Tài khoản</span>
                </Stack>
              </StyledIconButton>
            )
          }
          <StyledIconButton aria-label="cart" onClick={handleCartOpen}>
            <FaCartPlus />
          </StyledIconButton>
        </div>
      </StyledToolbar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={NavLink} to={`/profile/${idUser}`}>Thông tin tài khoản</MenuItem>
        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </StyledAppBar>
  );
};

export default Header;