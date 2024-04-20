import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000,
});

api.interceptors.request.use(
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


// Can thiệp vào quá trình response từ server gửi về
// api.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       return axios.post('http://localhost:8080/auth/refresh', {
//         refreshToken: localStorage.getItem('token')
//       }).then(response => {
//         const newAccessToken = response.data.accessToken;
//         localStorage.setItem('CHIEN', newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axios(originalRequest);
//       }).catch(error => {
//         localStorage.removeItem('token');
//         return Promise.reject(error);
//       });
//     }
//     return Promise.reject(error.response.data);
//   }
// );

export default api;
