import axios from "axios";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080`,
});

axiosClient.interceptors.request.use(
    async function (config) {
      const preToken = localStorage.getItem('token'); 
      try {
        const response = await axios.post(`http://localhost:8080/auth/refresh?token=${preToken}`);
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        config.headers.Authorization = `Bearer ${newToken}`;
      } catch (error) {
        console.error('Lỗi khi làm mới token:', error);
        throw error;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default axiosClient;



const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
});

