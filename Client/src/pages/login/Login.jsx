import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import "./Login.scss";
import { Link } from "react-router-dom";
import loginApi from "../../service/common/LoginApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // Thêm state cho remember me

  // Load mật khẩu từ localStorage khi component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }
    let res = await loginApi(email, password);
    if (res.statusCode === 200) {
      // toast.success("Đăng nhập thành công");
      sessionStorage.setItem("savedEmail", email);
      sessionStorage.setItem("savedUserId", res.maTaiKhoan);
      sessionStorage.setItem("savedUserName", res.hoTen);
      sessionStorage.setItem("savedUserRole", res.role);
      // Lưu mật khẩu vào localStorage nếu người dùng chọn remember me
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedUserId", res.maTaiKhoan);
        localStorage.setItem("savedUserName", res.hoTen);
        localStorage.setItem("savedUserRole", res.role);
      } else {
        localStorage.removeItem("savedEmail");
      }

      const userRole = res.role;
      if (userRole === "Admin") {
        navigate("/dashboard/admin");
      } else if (userRole === "CEO") {
        navigate("/dashboard/ceo");
      } else if (userRole === "Manager") {
        navigate("/dashboard/manager");
      } else {
        navigate('/')
      }
    } else {
      toast.error("Email hoặc mật khẩu chưa chính xác");
    }
  };


  return (
    <div className="login-container">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Đăng nhập</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật Khẩu"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <i
              className="icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </i>
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />{" "}
              Ghi nhớ trạng thái đăng nhập
            </label>
            <a href="/reser">Quyên mật khẩu?</a>
          </div>

          <button type="submit">Đăng nhập</button>

          <div className="register-link">
            <p>
              Bạn chưa có tài khoản? <a style={{ color: "blue" }} href="/register">Đăng ký</a>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;