import axios from 'axios';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
  baseURL: `http://localhost:8080/`
});

const loginApi = async (email, password) => {
  try {
    const data = {
      email: email,
      password: password
    };

    const response = await axiosClient.post("/auth/signin", data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response && response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    } else {
      throw new Error("Không thể lấy token từ phản hồi đăng nhập.");
    }
  } catch (error) {
    toast.error("Vui lòng nhập đúng email và mật khẩu");
    throw new Error("Đã xảy ra lỗi khi đăng nhập: " + error.message);
  }
};

// export
export default loginApi;
