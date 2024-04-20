import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { registerApi } from "../../service/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../login/Login.scss"; 
import bcrypt from 'bcryptjs';


const Register = () => {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hoTen, sethoTen] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [gioiTinh, setGioiTinh] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const navigate = useNavigate();

  const formatDateToSubmit = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (event) => {
    try {
    event.preventDefault();
    const ngaySinhFormatted = formatDateToSubmit(ngaySinh);
      const data ={
        quyen: "Member",
        hoTen: hoTen,
        ngaySinh: ngaySinhFormatted,
        gioiTinh: gioiTinh,
        soDienThoai: soDienThoai,
        email: email,
        matKhau: matKhau
      }
      let res = await registerApi(data)
      if (res.status === 200) {
        toast.success("Đăng kí thành công. Vui lòng xác nhận email để kích hoạt tài khoản");
        navigate("/login");
      } else {
        toast.error("Đăng kí thất bại");
      }
    } catch (error) {
      console.error('Error occurred while hashing password:', error);
      toast.error("Lỗi xảy ra trong quá trình đăng ký");
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Đăng Ký</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Họ tên"
              value={hoTen}
              onChange={(event) => sethoTen(event.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="date"
              placeholder="Ngày sinh"
              value={ngaySinh}
              onChange={(event) => setNgaySinh(event.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <select
              value={gioiTinh}
              onChange={(event) => setGioiTinh(event.target.value)}
              required
              style={{ borderRadius: '5px', padding: '5px' }}
            >
              <option value="">Giới Tính</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="input-box">
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={soDienThoai}
              onChange={(event) => setSoDienThoai(event.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <TfiEmail className="icon" />
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={matKhau}
              onChange={(event) => setMatKhau(event.target.value)}
              required
            />
            <i className="icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </i>
          </div>

          
          <button type="submit">Đăng Ký</button>

          <div className="login-link" style={{marginTop:"20px"}}>
            <p>
              Bạn đã có tài khoản? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;